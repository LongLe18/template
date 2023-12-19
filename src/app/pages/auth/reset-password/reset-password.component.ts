import { CommonModule } from '@angular/common';
import { Component, NgModule, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from 'src/app/services';
import { TranslatePipeModule } from 'src/app/pipes/translate.pipe';
import { IResponse } from 'src/app/constants/types/response';

const notificationText = 'We\'ve sent a link to reset your password. Check your inbox.';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  @Input() signInLink = '/auth/login';

  @Input() buttonLink = '/auth/login';

  defaultAuthData: IResponse;

  loading = false;

  formData: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email } = this.formData;
    this.loading = true;

    const result = await this.authService.resetPassword(email);
    this.loading = false;

    if (result.isOk) {
      this.router.navigate([this.buttonLink]);
      notify(notificationText, 'success', 2500);
    } else {
      notify(result.message, 'error', 2000);
    }
  }

  async ngOnInit(): Promise<void> {
    this.defaultAuthData = await this.authService.getUser();
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
    TranslatePipeModule,
  ],
  declarations: [ResetPasswordComponent],
  exports: [ResetPasswordComponent],
})
export class ResetPasswordModule { }
