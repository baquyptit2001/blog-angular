import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {User} from "../../model/user";
import {HelperService} from "../../service/helper.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../app.constants";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: User = new User();

  constructor(private cookieService: CookieService, private helper: HelperService, private _snackBar: MatSnackBar, private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.cookieService.check('access_token');
    this.user = this.helper.getUser();
  }

  logOut() {
    this.http.get<any>(API_URL + 'auth/logout', {headers: this.helper.setHeader()}).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate(['/auth/login']).then(r => {
          this.helper.clearUser();
            this._snackBar.open('Đăng xuất thành công', 'Đóng', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          }
        );
      }
      , (error) => {
        this._snackBar.open('Đăng xuất thất bại', 'Đóng', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      });
  }

}
