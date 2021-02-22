import { McasLoginComponent } from '@mcas/pages/mcas-login/mcas-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { MemberApplicationComponent } from './pages/member-application/member-application.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: McasLoginComponent
  },
  {
    path: 'apply',
    component: MemberApplicationComponent
  },
  { /* To Avoid 404 Error */
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
