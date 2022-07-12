import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Title} from "@angular/platform-browser";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../app.constants";
import {SetCookieService} from "../../service/set-cookie.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private titleService: Title, private cookieService: CookieService, private router: Router, private http: HttpClient, private setCookieService: SetCookieService) {
    this.titleService.setTitle('Đăng nhập');
  }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      this.http.post<any>(API_URL + 'auth/login', this.loginForm.value).subscribe(
        (data: any) => {
          console.log(data);
          this.cookieService.set('access_token', data.access_token);
          this.setCookieService.setCookieObject(data.user, 'user');
          this._snackBar.open('Đăng nhập thành công', 'Đóng', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          return this.router.navigate(['/']);
        }
        , (error) => {
          this._snackBar.open('Tài khoản hoặc mật khẩu không đúng', 'Đóng', {
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
