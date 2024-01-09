import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuardService } from '../commonLib/services';

import { SideNavOuterToolbarComponent, UnauthenticatedContentComponent } from 'src/layouts';
import { FileListComponent } from './file-list/file-list.component';

import { LoginComponent } from './auth/login/login.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { CreateAccountComponent } from './auth/create-account/create-account.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { AnalyticsDashboardComponent } from './analytics-dashboard/analytics-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MemberComponent } from './member-list/member.component';

const routes: Routes = [
  {
    path: 'auth',
    component: UnauthenticatedContentComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'create-account',
        component: CreateAccountComponent,
      },
      {
        path: 'change-password/:recoveryCode',
        component: ChangePasswordComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: '',
    component: SideNavOuterToolbarComponent,
    children: [
      {
        path: 'analytics-dashboard',
        component: AnalyticsDashboardComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'member',
        component: MemberComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "file-list",
        component: FileListComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: '**',
        redirectTo: 'analytics-dashboard',
        pathMatch: 'full',
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
