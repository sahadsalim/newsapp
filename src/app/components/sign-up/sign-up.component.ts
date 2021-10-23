import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private router: Router, private api: ApiService) {}
  isResgisterView: boolean = false;
  isEmailExist: boolean = false;
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
    username: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9]*$'),
    ]),
  });
  ngOnInit(): void {}
  signup() {
    if (this.form.valid) {
      let body = {
        username: this.form.controls['username'].value,
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value,
      };
      this.api.getUserList(body).subscribe(
        (data: any) => {
          const user = data?.find((user: any) => user.email === body.email);
          if (user) {
            setTimeout(() => {
              this.isEmailExist = false;
            }, 1000);
            this.isEmailExist = true;
          } else {
            const newuser = user ? user.push(body) : [body];
            localStorage.setItem('users', JSON.stringify(newuser));
            this.form.reset();
            this.router.navigate(['/login']);
            this.api.showSuccess('User registration successfull');
          }
        },
        (error: any) => {
          console.log(error);
          this.api.showError(error);
        }
      );
    }
  }
  switchView() {
    this.router.navigate(['/login']);
  }
}
