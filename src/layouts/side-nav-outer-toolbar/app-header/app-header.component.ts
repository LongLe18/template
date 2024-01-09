import {
  Component, NgModule, Input, Output, EventEmitter, OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { UserPanelModule } from 'src/commonLib/components/user-panel/user-panel.component';
import { LanguagesMenuModule } from 'src/commonLib/components';
import { AuthService } from 'src/commonLib/services';
import { ThemeSwitcherModule } from 'src/commonLib/components/shared/theme-switcher/theme-switcher.component';
import { Router } from '@angular/router';
import { TranslationService } from 'src/commonLib/services/translate.service';
import { TranslatePipeModule } from 'src/commonLib/pipes/translate.pipe';
import { IUser, Locale } from 'src/commonLib/constants/types';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})

export class AppHeaderComponent implements OnInit {

  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  user: IUser | null = { email: '' };

  userMenuItems = [
  {
    text: 'Cập nhật thông tin',
    icon: 'user',
    onClick: () => {
      this.router.navigate(['/user-profile']);
    },
  },
  {
    text: 'Đổi mật khẩu',
    icon: 'lock',
    onClick: () => {
      this.router.navigate(['/user-profile']);
    },
  },
  {
    text: 'Đăng xuất',
    icon: 'runner',
    onClick: () => {
      this.authService.logOut();
    },
  }];

  locales: Locale[];

  constructor(private authService: AuthService,
    private router: Router,
    private TranslationService: TranslationService) {
      this.locales = TranslationService.getLocales();
  }

  ngOnInit() {
    this.authService.getUser().then((e) => this.user = e.data);
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  };
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    DxToolbarModule,
    ThemeSwitcherModule,
    UserPanelModule,
    LanguagesMenuModule,
    TranslatePipeModule,
  ],
  declarations: [AppHeaderComponent],
  exports: [AppHeaderComponent],
})
export class AppHeaderModule { }
