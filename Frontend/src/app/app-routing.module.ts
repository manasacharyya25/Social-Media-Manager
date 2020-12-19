import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';

import { AuthenticationGuard } from './authenticationGuard';
import { SubscriptionComponent } from './subscription/subscription.component';


const routes: Routes = [
  {
    path:'',
    component: LandingPageComponent,
    pathMatch: 'full',
  },
  {
    path:'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'post',
    component: PostComponent,
    pathMatch: 'full',
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'subscription',
    component: SubscriptionComponent,
    pathMatch: 'full',
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
