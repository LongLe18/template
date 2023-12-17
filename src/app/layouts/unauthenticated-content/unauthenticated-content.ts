import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SingleCardModule } from 'src/app/layouts';
import { Router } from '@angular/router';
import { formatMessage } from 'devextreme/localization';

@Component({
  selector: 'app-unauthenticated-content',
  template: `
    <app-single-card [title]="title" [description]="description">
      <router-outlet></router-outlet>
    </app-single-card>
  `,
  styles: [`
    :host {
      width: 100%;
      height: 100%;
    }
  `],
})
export class UnauthenticatedContentComponent {
  formatMessage = formatMessage;

  constructor(private router: Router) { }

  get description() {
    const path = this.router.url.split('/').at(-1);
    switch (path) {
      case 'reset-password': return formatMessage('resetpassword-message');
      default: return '';
    }
  }

  get title() {
    const path = this.router.url.split('/').at(-1);
    switch (path) {
      case 'login': return formatMessage('signin');
      case 'reset-password': return formatMessage('resetpassword');
      case 'create-account': return formatMessage('signup');
      case 'change-password': return formatMessage('changePassword');
      default: return '';
    }
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SingleCardModule,
  ],
  declarations: [UnauthenticatedContentComponent],
  exports: [UnauthenticatedContentComponent],
})
export class UnauthenticatedContentModule { }
