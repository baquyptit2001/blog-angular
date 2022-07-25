import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {API_URL} from "../../app.constants";
import {ActivatedRoute, Router} from "@angular/router";
import {PasswordConfirmValidators} from "../../validation/password-confirm";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private titleService: Title, private http: HttpClient, private _snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  changePasswordForm = this.formBuilder.group({
    password: new FormControl('', [Validators.required]),
    password_confirmation: new FormControl('', [Validators.required]),
  }, {validators: PasswordConfirmValidators.mustMatch('password', 'password_confirmation')});

  token: string = '';

  ngOnInit(): void {
    this.titleService.setTitle('Đổi mật khẩu');
    this.token = this.activatedRoute.snapshot.params['token']
    console.log(this.token)
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      this.http.post<any>(API_URL + 'auth/reset_password/' + this.token, this.changePasswordForm.value).subscribe(
        (data: any) => {
          console.log(data);
          this._snackBar.open('Mật khẩu đã được thay đổi', 'Đóng', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          return this.router.navigate(['/accounts/login']);
        }
        , (error) => {
          this._snackBar.open('Mật khẩu không đúng', 'Đóng', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      );
    }
  }

}
