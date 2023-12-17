import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TokenInterceptor } from "./interceptors/token.interceptor";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { ApiInterceptor } from "./interceptors/api.interceptor";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { SideNavOuterToolbarComponent, SideNavOuterToolbarModule, SingleCardModule } from './layouts';
import {
  ResetPasswordFormModule,
  CreateAccountFormModule,
  ChangePasswordFormModule,
  LoginFormModule,
  AnalyticsDashboardModule,
} from './pages';
import { 
  AppFooterModule
} from './devexpress'
import { AuthService, ScreenService, AppInfoService, ThemeService } from './services';
import { UnauthenticatedContentModule } from './layouts/unauthenticated-content/unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SingleCardModule,
    AppFooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AnalyticsDashboardModule,
    
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
