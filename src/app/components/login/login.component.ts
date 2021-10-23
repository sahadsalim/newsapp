import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private api: ApiService) {}
  form: any = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z0-9]*$'),
    ]),
  });
  ngOnInit(): void {}
  login() {
    if (this.form.valid) {
      let body = {
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value,
      };
      this.api.getUserList(body).subscribe(
        (data: any) => {
          const user=data.find((user:any)=> user.email===body.email&& user.password===body.password);
          if (user) {
            this.api.showSuccess('Login successfull');
            sessionStorage.setItem('isAuthenticated',"true");
            sessionStorage.setItem("currentUser",JSON.stringify(user));
            this.form.reset();
            this.router.navigate(['/home']);
          }else{
          this.api.showError('Please check the Credentials');

          }
        },
        (error: any) => {
          this.api.showError(error);
        }
      );
    }
  }
  switchView() {
    this.router.navigate(['/register']);
  }
}
