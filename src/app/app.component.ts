import { Component, HostBinding, OnDestroy, } from '@angular/core';
import { AppInfoService, AuthService, ScreenService, ThemeService } from './services';
import { TranslationService } from './services/translate.service';
import { locale, loadMessages } from 'devextreme/localization';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TranslationService],
})
export class AppComponent implements OnDestroy {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter((cl) => this.screen.sizes[cl]).join(' ');
  }

  locale: string;

  constructor(private authService: AuthService,
              private themeService: ThemeService,
              private screen: ScreenService,
              public appInfo: AppInfoService,
              private TranslationService: TranslationService) {
    this.locale = this.TranslationService.getCurrentLanguage();
    themeService.setAppTheme();
    this.initMessages();
    locale(this.locale);
  }

  initMessages() {
    loadMessages(this.TranslationService.getDictionary());
  }

  isAuthenticated() {
    return this.authService.loggedIn;
  }

  ngOnDestroy(): void {
    this.screen.breakpointSubscription.unsubscribe();
  }
}
