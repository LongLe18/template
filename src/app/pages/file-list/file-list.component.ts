import { Component, NgModule } from '@angular/core';
import { DxDropDownButtonModule, DxButtonModule, DxSelectBoxModule, DxTextBoxModule, 
    DxScrollViewModule, DxToolbarModule, DxTabPanelModule, DxFormModule } from 'devextreme-angular';

import { TranslatePipeModule } from 'src/app/pipes/translate.pipe';
@Component({
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.scss'],
    providers: [],
})
export class FileListComponent {

    isLoading = false;

    constructor() {}
    
    refresh = () => {
        this.isLoading = true;
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
    ],
    providers: [],
    exports: [],
    declarations: [FileListComponent],
})
export class FileListModule { }