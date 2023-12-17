import { CommonModule } from '@angular/common';
import { Component, NgModule, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { LoginOauthModule } from 'src/app/components/login-oauth/login-oauth.component';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import notify from 'devextreme/ui/notify';
import { AuthService, IResponse, ThemeService } from 'src/app/services';
import { CommonConst } from 'src/app/constants/commom';
import { TranslatePipeModule } from 'src/app/pipes/translate.pipe';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() resetLink = CommonConst.RESET_PASSWORD;
  @Input() createAccountLink = CommonConst.SIGNUP;

  defaultAuthData: IResponse;

  btnStylingMode: string;

  passwordMode = 'password';

  loading = false;

  formData: any = {};

  passwordEditorOptions = {
    placeholder: 'Password',
    stylingMode: 'filled',
    mode: this.passwordMode,
    value: 'password',
    // buttons: [{
    //   name: 'password',
    //   location: 'after',
    //   options: {
    //     icon: 'info',
    //     stylingMode:'text',
    //     onClick: () => this.changePasswordMode(),
    //   }
    // }]
  }

  constructor(private authService: AuthService, private router: Router, private themeService: ThemeService) {
    this.themeService.isDark.subscribe((value: boolean) => {
      this.btnStylingMode = value ? 'outlined' : 'contained';
    });
  }

  changePasswordMode() {
    this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
  };

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email, password } = this.formData;
    this.loading = true;

    const result = await this.authService.logIn(email, password);
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
    TranslatePipeModule,
  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
})
export class LoginFormModule { }
