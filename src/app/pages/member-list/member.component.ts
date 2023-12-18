import { Component, ViewChild, NgModule } from '@angular/core';
import { DxDataGridModule, DxDropDownButtonModule, DxButtonModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { DxDataGridComponent, DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import DataSource from 'devextreme/data/data_source';
import { DataService } from 'src/app/services';
import { Contact, contactStatusList, } from 'src/app/types/contact';

import { formatMessage } from 'devextreme/localization';
import { TranslatePipeModule } from 'src/app/pipes/translate.pipe';
import { formatPhone } from 'src/app/pipes/phone.pipe';
import notify from 'devextreme/ui/notify';
import { FilterToolBarModule, FilterToolBarComponent, MemberNewFormComponent, 
  MemberNewFormModule, ContactStatusModule, FormPopupModule } from 'src/app/components';

@Component({
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  providers: [DataService],
})
export class MemberComponent {
  @ViewChild(DxDataGridComponent, { static: true }) dataGrid: DxDataGridComponent;
  
  @ViewChild(MemberNewFormComponent, { static: false }) memberNewForm: MemberNewFormComponent;

  @ViewChild(FilterToolBarComponent, { static: false }) filterNewForm: FilterToolBarComponent;

  formatMessage = formatMessage;

  userId: number;

  isPanelOpened = false;

  isAddContactPopupOpened = false;

  statusList = contactStatusList;

  events: Array<string> = [];

  // sample call api
  dataSource = new DataSource<Contact[], string>({
    key: 'id',
    load: () => new Promise((resolve, reject) => {
      this.service.getContacts().subscribe({
          next: (data: Contact[]) => {
            data.forEach((item, index) => {
              item.stt = index + 1
            });
            resolve(data);
          },
          error: ({message}) => reject(message)
        })
    }),
  });

  constructor(private service: DataService) {}

  rowClick(e: DxDataGridTypes.RowClickEvent) {
    const { data } = e;

    this.userId = data.id;
    this.isPanelOpened = true;
  }
  
  addContact() {
    this.isAddContactPopupOpened = true;
  };

  refresh = () => {
    this.dataGrid.instance.refresh();
  };

  customizePhoneCell = ({ value }) => value ? formatPhone(value) : undefined;
  
  logEvent(eventName) {
    this.events.unshift(eventName);
  }

  onClickSaveNewMember = () => {
    const { firstName, lastName } = this.memberNewForm.getNewContactData();
    // request API - post data using service

    notify({
        message: `${formatMessage('add')} ${formatMessage('member')} "${firstName} ${lastName}" saved`,
        position: { at: 'top center', my: 'top center' }
      },
      'success');
  };

  onSearch = () => {
    // get object value from filter Toolbar
    console.log(this.filterNewForm.objSearch);
  }
} 

@NgModule({
    imports: [
      DxButtonModule,
      DxDataGridModule,
      DxDropDownButtonModule,
      DxSelectBoxModule,
      DxTextBoxModule,

      MemberNewFormModule,
      FormPopupModule,
      ContactStatusModule,
      FilterToolBarModule,
      TranslatePipeModule,
    ],
    providers: [],
    exports: [],
    declarations: [MemberComponent],
})
export class MemberModule { }