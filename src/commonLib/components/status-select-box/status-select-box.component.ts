import {
  Component, EventEmitter, Input, NgModule, Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { contactStatusList } from 'src/commonLib/constants/types/contact';
import { ContactStatusModule } from 'src/commonLib/components/shared/member-status/member-status.component';

@Component({
  selector: 'status-select-box',
  templateUrl: 'status-select-box.component.html',
  styleUrls: ['./status-select-box.component.scss'],
})
export class StatusSelectBoxComponent {
  @Input() value: string;

  @Input() label = '';

  @Input() items = contactStatusList;

  @Input() readOnly = false;

  @Input() stylingMode = 'outlined';

  @Input() labelMode = 'floating';

  @Output() valueChange = new EventEmitter<string>();
}

@NgModule({
  imports: [
    DxSelectBoxModule,
    DxTextBoxModule,
    ContactStatusModule,
    CommonModule],
  declarations: [StatusSelectBoxComponent],
  exports: [StatusSelectBoxComponent],
})
export class StatusSelectBoxModule {}
