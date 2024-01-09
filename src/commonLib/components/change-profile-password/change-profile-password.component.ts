import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, NgModule, Output, ViewChild} from '@angular/core';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import {FormPopupComponent, FormPopupModule} from 'src/commonLib/components/shared/form-popup/form-popup.component';
import notify from 'devextreme/ui/notify';

import {
  PasswordTextBoxComponent,
  PasswordTextBoxModule,
} from 'src/commonLib/components/shared/password-text-box/password-text-box.component';

import { ValidationRule } from 'devextreme-angular/common';
import { TranslatePipeModule } from 'src/commonLib/pipes/translate.pipe';
import { formatMessage } from 'devextreme/localization';

@Component({
  selector: 'change-profile-password',
  templateUrl: './change-profile-password.component.html',
  styleUrls: ['./change-profile-password.component.scss']
})
export class ChangeProfilePasswordComponent {

  @ViewChild(FormPopupComponent, { static: true }) formPopup;

  @ViewChild('confirmField', { static: true }) confirmField: PasswordTextBoxComponent;

  @Input() visible = false;

  @Output() visibleChange = new EventEmitter<boolean>();

  formatMessage = formatMessage;

  isSaveDisabled = true;

  formData: Record<string, any> = {};

  confirmPasswordValidators: ValidationRule[] = [
    {
      type: 'compare',
      message: formatMessage('message-pasword-error'),
      comparisonTarget: () => this.formData.password,
    },
  ];

  async onFieldChanged() {
    const formValues = Object.entries(this.formData);

    this.isSaveDisabled =  await (formValues.length != 3 || !!formValues.find(([_, value]) => !value) || !this.formPopup.isValid());
  }

  saveNewPassword(): void {
    notify({ message: 'Password Changed', position: {at: 'bottom center', my: 'bottom center'}}, 'success');
  }

  checkConfirm(): void {
    this.confirmField.revalidate();
  }

  onNewPasswordChanged() {
    this.checkConfirm();
    this.onFieldChanged();
  }

  changeVisible(visible: boolean): void {
    this.visible = visible;
    this.visibleChange.emit(this.visible);
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxFormModule,
    DxLoadIndicatorModule,
    PasswordTextBoxModule,
    FormPopupModule,
    TranslatePipeModule,
  ],
  declarations: [ChangeProfilePasswordComponent],
  exports: [ChangeProfilePasswordComponent],
})
export class ChangeProfilePasswordModule { }
