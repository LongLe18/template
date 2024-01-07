import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {
  LoginComponent,
  ResetPasswordComponent,
  CreateAccountComponent,
  ChangePasswordComponent,
  AnalyticsDashboardComponent,
  UserProfileComponent,
  MemberComponent,
} from './pages';
import { AuthGuardService } from './services';

import { SideNavOuterToolbarComponent, UnauthenticatedContentComponent } from './layouts';
import { FileListComponent } from './pages/file-list/file-list.component';


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
