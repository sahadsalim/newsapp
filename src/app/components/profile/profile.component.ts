import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userData: any;
  constructor(private router: Router, private api: ApiService) {}
  form: any = new FormGroup({
    email: new FormControl({ value: '', disabled: true }, [
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

  save() {
    if (this.form.valid) {
      let body = {
        username: this.form.controls['username'].value,
        password: this.form.controls['password'].value,
        email: this.form.controls['email'].value,
      };
      this.form.reset();
      this.router.navigate(['/home']);
      sessionStorage.setItem('currentUser', JSON.stringify(body));
      const newUserlist = this.api?.userList?.filter(
        (user: any) => user.email === body.email
      );
      newUserlist.push(body);
      localStorage.setItem('users', JSON.stringify(newUserlist));
    }
  }

  onValueChange(file: any) {
    console.log('File changed!');
  }
  ngOnInit(): void {
    this.userData = sessionStorage.getItem('currentUser');
    let val = JSON.parse(<string>this.userData);
    console.log(val);

    this.form.patchValue({
      username: val.username,
      password: val.password,
      email: val.email,
    });
  }
  Delete() {
    const newUserlist = this.api.userList.filter(
      (user: any) => user.email === this.userData.email
    );
    localStorage.setItem('users', JSON.stringify(newUserlist));
    sessionStorage.setItem('currentUser', '');
    sessionStorage.setItem('isAuthenticated', 'false');
    this.router.navigate(['login']);
  }
}
