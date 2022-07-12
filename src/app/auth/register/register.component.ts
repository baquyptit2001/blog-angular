import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {PasswordConfirmValidators} from "../../validation/password-confirm";
import {Title} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../app.constants";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {User} from "../../model/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  registerForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password_confirmation: new FormControl('', [Validators.required]),
  }, {validators: PasswordConfirmValidators.mustMatch('password', 'password_confirmation')});

  constructor(private formBuilder: FormBuilder, private titleService: Title, private http: HttpClient, private _snackBar: MatSnackBar, private router: Router) {
    this.titleService.setTitle('Đăng ký');
  }

  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.valid) {
      console.log(this.registerForm);
      this.http.post<any>(API_URL + 'auth/register', this.registerForm.value).subscribe(
        (data: any) => {
          console.log(data);
          this._snackBar.open('Đăng ký thành công', 'Đóng', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          return this.router.navigate(['/auth/login']);
        }, (error) => {
          console.log(error);
        }
      );
    }
  }

}
