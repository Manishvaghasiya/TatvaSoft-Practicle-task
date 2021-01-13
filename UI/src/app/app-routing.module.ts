import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { CreateBlogComponent } from './blogs/create-blog/create-blog.component';
import { MyBlogsComponent } from './blogs/my-blogs/my-blogs.component';
import { AuthGuard } from './guards/auth.guard';
import { NonAuthGuard } from './guards/non-auth.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [NonAuthGuard],
    component: LoginComponent,
  },
  {
    path: 'signup',
    canActivate: [NonAuthGuard],
    component: SignupComponent,
  },
  {
    path: 'blogs',
    canActivate: [AuthGuard],
    component: BlogsComponent,
  },
  {
    path: 'my-blogs',
    canActivate: [AuthGuard],
    component: MyBlogsComponent,
  },
  {
    path: 'create-blog',
    canActivate: [AuthGuard],
    component: CreateBlogComponent,
  },
  {
    path: '**',
    redirectTo: 'blogs',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
