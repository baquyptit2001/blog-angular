import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {en_US, NZ_I18N, vi_VN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import vi from '@angular/common/locales/vi';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {MatSliderModule} from "@angular/material/slider";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './common/header/header.component';
import {MatDividerModule} from "@angular/material/divider";
import { BlogComponent } from './component/blog/blog.component';
import { BlogDetailComponent } from './component/blog-detail/blog-detail.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { AvatarComponent } from './common/avatar/avatar.component';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatPaginatorModule} from "@angular/material/paginator";
import { FooterComponent } from './common/footer/footer.component';
import { LoaderComponent } from './common/loader/loader.component';
import { AuthComponent } from './layout/auth/auth.component';
import { ClientComponent } from './layout/client/client.component';
import {LoginComponent} from "./auth/login/login.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import { RegisterComponent } from './auth/register/register.component';

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    BlogComponent,
    BlogDetailComponent,
    AvatarComponent,
    FooterComponent,
    LoaderComponent,
    AuthComponent,
    ClientComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NzPageHeaderModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    ReactiveFormsModule,
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}, FormBuilder, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule {
}
