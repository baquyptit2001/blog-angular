import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {BlogComponent} from "./component/blog/blog.component";
import {BlogDetailComponent} from "./component/blog-detail/blog-detail.component";
import {AuthGuardService} from "./service/auth-guard.service";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'blogs',
    children: [
      {path: '', component: BlogComponent},
      {path: ':slug', component: BlogDetailComponent}
    ],
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
