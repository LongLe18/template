import { Component, NgModule } from '@angular/core';
import { DxDropDownButtonModule, DxButtonModule, DxSelectBoxModule, DxTextBoxModule,
    DxScrollViewModule, DxToolbarModule, DxTabPanelModule, DxFormModule } from 'devextreme-angular';
import { ApplyPipeModule } from 'src/commonLib/pipes/apply.pipe';

import { TranslatePipeModule } from 'src/commonLib/pipes/translate.pipe';
@Component({
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.scss'],
    providers: [],
})
export class FileListComponent {

  assign = Object.assign;

  isLoading = false;

  formData: any = {};

  constructor() {}

  refresh = () => {
    this.isLoading = true;
  }

  onSaveClick = () => {
    console.log(this.formData)
  }
}

@NgModule({
    imports: [
        DxButtonModule,
        DxDropDownButtonModule,
        DxSelectBoxModule,
        DxTextBoxModule,
        DxScrollViewModule,
        DxToolbarModule,
        DxTabPanelModule,
        DxFormModule,

        TranslatePipeModule,
        ApplyPipeModule
    ],
    providers: [],
    exports: [],
    declarations: [FileListComponent],
})
export class FileListModule { }
