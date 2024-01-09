import { Component, NgModule } from '@angular/core';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { ThemeService } from '../../../commonLib/services/theme.service';
import { TranslatePipeModule } from 'src/commonLib/pipes/translate.pipe';

@Component({
  selector: 'app-login-oauth',
  templateUrl: './login-oauth.component.html',
  styleUrls: ['./login-oauth.component.scss']
})
export class LoginOauthComponent {
  btnStylingMode: string;

  constructor(private themeService: ThemeService) {
    this.themeService.isDark.subscribe((value: boolean) => {
      this.btnStylingMode = value ? 'outlined' : 'contained';
    });
  }


}

@NgModule({
  imports: [
    DxButtonModule,
    TranslatePipeModule,
  ],
  declarations: [LoginOauthComponent],
  exports: [LoginOauthComponent],
})
export class LoginOauthModule { }
