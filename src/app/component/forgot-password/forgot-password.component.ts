import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {API_URL} from "../../app.constants";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {


  constructor(private formBuilder: FormBuilder, private titleService: Title, private http: HttpClient, private _snackBar: MatSnackBar, private router: Router) { }

  forgotPasswordForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    platform: new FormControl('angular', [Validators.required]),
  })

  ngOnInit(): void {
    this.titleService.setTitle('Quên mật khẩu');
  }

  forgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.http.post<any>(API_URL + 'auth/forgot_password', this.forgotPasswordForm.value).subscribe(
        (data: any) => {
          console.log(data);
          this._snackBar.open('Một email đã được gửi đến email của bạn', 'Đóng', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
        , (error) => {
          this._snackBar.open('Email không tồn tại', 'Đóng', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      );
    } else {

    }
  }

}
