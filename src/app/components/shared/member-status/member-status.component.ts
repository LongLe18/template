import {
  Component, Input, NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactStatus } from 'src/app/constants/types/contact';

@Component({
  selector: 'member-status',
  template: `
  <span class="status status-{{ value | lowercase }}">{{ showText ? value : '' }}</span>
`,
  styleUrls: ['./member-status.component.scss'],
})
export class ContactStatusComponent {
  @Input() value: ContactStatus;

  @Input() showText = true;
}

@NgModule({
  imports: [CommonModule],
  declarations: [ContactStatusComponent],
  exports: [ContactStatusComponent],
})
export class ContactStatusModule { }
