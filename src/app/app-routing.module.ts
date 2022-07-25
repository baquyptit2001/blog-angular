import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {BlogComponent} from "./component/blog/blog.component";
import {BlogDetailComponent} from "./component/blog-detail/blog-detail.component";
import {ClientComponent} from "./layout/client/client.component";
import {AuthComponent} from "./layout/auth/auth.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {SideBarComponent} from "./common/side-bar/side-bar.component";
import {ForgotPasswordComponent} from "./component/forgot-password/forgot-password.component";
import {ChangePasswordComponent} from "./component/change-password/change-password.component";

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {path: '', component: HomeComponent},
      {
        path: 'blogs',
        children: [
          {path: '', component: BlogComponent},
          {path: ':slug', component: BlogDetailComponent}
        ],
      },
    ]
  },
  {
    path: 'accounts',
    component: AuthComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {
        path: 'forgot_password',
        children: [
          {path: '', component: ForgotPasswordComponent},
          {path: ':token', component: ChangePasswordComponent}
        ]
      }
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
