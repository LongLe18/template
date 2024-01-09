import { Component, Input, NgModule } from '@angular/core';
import { DxDropDownButtonModule, DxButtonModule, DxSelectBoxModule, DxTextBoxModule,
    DxDateRangeBoxModule } from 'devextreme-angular';
import { Filter, filter } from 'src/commonLib/constants/types/filter';
import { TranslatePipeModule } from 'src/commonLib/pipes/translate.pipe';

const msInDay = 1000 * 60 * 60 * 24;
const now = new Date();
const initialValue: [Date, Date] = [
    new Date(now.getTime() - msInDay * 3),
    new Date(now.getTime() + msInDay * 3),
];

@Component({
    selector: 'filter-toolbar',
    templateUrl: './filter-toolbar.component.html',
    styleUrls: ['./filter-toolbar.component.scss'],
    providers: [],
})
export class FilterToolBarComponent {

    initialValue: [Date, Date] = initialValue;

    @Input() optionData: any[];

    @Input() labelOption: string;

    objSearch: Filter = filter;

    constructor() {
        this.objSearch.dateFrom = initialValue[0];
        this.objSearch.dateTo = initialValue[1];
    }

    onChangeSearch(data: any) { // 
        this.objSearch.search = data?.value;
    }
    
    onChangeDates(data: any) {
        this.objSearch.dateFrom = data?.value[0];
        this.objSearch.dateFrom = data?.value[1];
    }

    onChangeOption(e: any) {
        this.objSearch.status = e?.value;
    }
}

@NgModule({
    imports: [
        DxButtonModule,
        DxDropDownButtonModule,
        DxSelectBoxModule,
        DxTextBoxModule,
        DxDateRangeBoxModule,
        TranslatePipeModule,
    ],
    providers: [],
    exports: [FilterToolBarComponent],
    declarations: [FilterToolBarComponent],
})
export class FilterToolBarModule { }