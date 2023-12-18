import {
  Component,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxTextBoxModule,
  DxFormModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { FormPhotoUploaderModule, FormTextboxModule } from 'src/app/components';
import { newContact } from 'src/app/types/contact';
import { getSizeQualifier } from 'src/app/services/screen.service';
import { TranslatePipeModule } from 'src/app/pipes/translate.pipe';

@Component({
  selector: 'member-new-form',
  templateUrl: './member-new-form.component.html',
  providers: [],
})

export class MemberNewFormComponent {
  
  newUser = newContact;
  getSizeQualifier = getSizeQualifier;
  constructor() { }

  getNewContactData = () => ({ ...this.newUser })
}

@NgModule({
  imports: [
    DxTextBoxModule,
    DxFormModule,
    DxValidatorModule,

    FormTextboxModule,
    FormPhotoUploaderModule,

    CommonModule,
    TranslatePipeModule,
  ],
  declarations: [MemberNewFormComponent],
  exports: [MemberNewFormComponent],
})
export class MemberNewFormModule { }
