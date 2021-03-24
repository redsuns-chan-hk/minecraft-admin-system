import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/pekomikoland/home/home.component';
import { AdminAuthGuard } from './auth/admin-auth.guard';
import { MemberApplicationComponent } from './pages/member/member-application/member-application.component';
import { AboutComponent } from './pages/pekomikoland/about/about.component';
import { MainPanelComponent } from './pages/admin/main-panel/main-panel.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: MainPanelComponent,
    canActivate: [
      AdminAuthGuard
    ]
  },
  {
    path: 'apply',
    component: MemberApplicationComponent
  },
  {
    path: 'about',
    component: AboutComponent
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
