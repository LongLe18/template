import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TokenInterceptor } from "src/commonLib/interceptors/token.interceptor";
import { ErrorInterceptor } from "src/commonLib/interceptors/error.interceptor";
import { ApiInterceptor } from "src/commonLib/interceptors/api.interceptor";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SingleCardModule } from 'src/layouts';
import { ResetPasswordModule } from './auth/reset-password/reset-password.component';
import { ChangePasswordModule } from './auth/change-password/change-password.component';
import { CreateAccountModule } from './auth/create-account/create-account.component';
import { LoginModule } from './auth/login/login.component';
import { AnalyticsDashboardModule } from './analytics-dashboard/analytics-dashboard.component';
import { AuthService, ScreenService, AppInfoService, ThemeService } from '../commonLib/services';
import { UnauthenticatedContentModule } from 'src/layouts/unauthenticated-content/unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SingleCardModule,
    ResetPasswordModule,
    CreateAccountModule,
    ChangePasswordModule,
    LoginModule,
    AnalyticsDashboardModule,
    UnauthenticatedContentModule,
    
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [AuthService, ScreenService, AppInfoService, ThemeService, 
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
