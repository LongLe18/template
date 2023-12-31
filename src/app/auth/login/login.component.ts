import { CommonModule } from '@angular/common';
import { Component, NgModule, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IResponse } from 'src/commonLib/constants/types/response';
import { LoginOauthModule } from 'src/commonLib/components/login-oauth/login-oauth.component';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import notify from 'devextreme/ui/notify';
import { AuthService, ThemeService } from 'src/commonLib/services';
import { CommonConst } from 'src/commonLib/constants/common';
import { TranslatePipeModule } from 'src/commonLib/pipes/translate.pipe';
import { PasswordTextBoxModule } from 'src/commonLib/components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() resetLink = CommonConst.RESET_PASSWORD;

  @Input() createAccountLink = CommonConst.SIGNUP;

  defaultAuthData: IResponse;

  btnStylingMode: string;

  isPasswordMode = true;

  loading = false;

  formData: any = {};

  password: string = 'password';

  constructor(private authService: AuthService, private router: Router, private themeService: ThemeService) {
    this.themeService.isDark.subscribe((value: boolean) => {
      this.btnStylingMode = value ? 'outlined' : 'contained';
    });
  }

  onChangPassword = (e: string) => {
    this.password = e;
  }

  switchMode = () => {
    this.isPasswordMode = !this.isPasswordMode;
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email } = this.formData;
    this.loading = true;

    const result = await this.authService.logIn(email, this.password);
    this.loading = false;
    if (!result.isOk) {
      notify(result.message, 'error', 2000);
    } else {
      this.router.navigate([CommonConst.DASHBOARD]);
    }
  }

  onCreateAccountClick = () => {
    this.router.navigate([this.createAccountLink]);
  };

  async ngOnInit(): Promise<void> {
    this.defaultAuthData = await this.authService.getUser();
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LoginOauthModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxButtonModule,
    PasswordTextBoxModule,
    TranslatePipeModule,
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule { }
