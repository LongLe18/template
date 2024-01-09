import {
  ChangeDetectorRef,
  Component, NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import notify from 'devextreme/ui/notify';
import {
  DxButtonModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxFormModule,
  DxNumberBoxModule,
  DxDateBoxModule,
  DxLoadPanelModule,
  DxFileUploaderModule,
  DxScrollViewModule,
} from 'devextreme-angular';
import { forkJoin } from 'rxjs';
import { PhonePipeModule } from 'src/commonLib/pipes/phone.pipe';
import { DataService, ScreenService } from 'src/commonLib/services';
import { formatMessage } from 'devextreme/localization';
import { ProfileCardModule, ChangeProfilePasswordModule, FormTextboxModule, FormPhotoModule,
  FormPopupModule } from 'src/commonLib/components';  

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [DataService],
})
export class UserProfileComponent {
  profileId = 22;

  profileData: Record<string, any>;

  savedProfileData: Record<string, any>;

  isLoading = true;

  supervisorsList = [];

  isChangePasswordPopupOpened = false;

  isDataChanged = false;

  isContentScrolled = false;

  basicInfoItems: Record<string, any>[] = this.getBasicInfoItems();

  contactItems: Record<string, any>[] = this.getContactItems();

  addressItems: Record<string, any>[] = this.getAddressItems();

  formatMessage = formatMessage;
  
  constructor(private service: DataService, public screen: ScreenService, private ref: ChangeDetectorRef) {
    forkJoin([
      service.getSupervisors(),
      service.getProfile(this.profileId)
    ]).subscribe(([supervisorsList, profileData]) => {
      this.supervisorsList.length = 0;
      this.supervisorsList.push(...supervisorsList);
      this.profileData = profileData;
      this.setSavedData();
      this.isLoading = false;
    });
  }

  getBasicInfoItems(){
    return [
      { dataField: 'firstName', colSpan: 4, label: formatMessage('fullname') },
      // { dataField: 'lastName', colSpan: 2 },
      {
        dataField: 'department',
        editorType: 'dxSelectBox',
        colSpan: 1,
        editorOptions: {
          items: ['UI/UX', 'Backend Developers'],
        },
        label: formatMessage('department'),
      },
      {
        dataField: 'position',
        editorType: 'dxSelectBox',
        colSpan: 1,
        editorOptions: {
          items: ['Designer', 'Developer', 'Technical Writer'],
        },
        label: formatMessage('position'),
      },
      {
        dataField: 'gender',
        editorType: 'dxSelectBox',
        colSpan: 1,
        editorOptions: {
          items: [formatMessage('female'), formatMessage('male'), formatMessage('otherGender')],
        },
        label: formatMessage('gender'),
      },
      // {
      //   dataField: 'hiredDate',
      //   editorType: 'dxDateBox',
      //   colSpan: 1,
      //   editorOptions: {
      //     max: new Date(),
      //   }
      // },
      {
        dataField: 'birthDate',
        colSpan: 1,
        editorType: 'dxDateBox',
        editorOptions: {
          max: new Date(),
        },
        label: formatMessage('birthday')
      },
    ]
  }

  getContactItems() {
    return [
      {
        dataField: 'phone',
        editorOptions: {
          mask: '(+84)0000-000-000',
        },
        label: formatMessage('phone')
      },
      {
        dataField: 'email',
        validators: [
          {type: 'email'}
        ]
      },
      // {
      //   dataField: 'domainUsername',
      //   colSpan: 2,
      // },
      {
        dataField: 'status',
        colSpan: 2,
      },
      // {
      //   dataField: 'supervisor',
      //   label: 'Supervisor',
      //   colSpan: 2,
      //   itemsList: this.supervisorsList,
      //   editorType: 'dxSelectBox',
      // },
    ];
  }

  getAddressItems() {
    return [
      { dataField: 'country', label: formatMessage('country') },
      { dataField: 'city', label: formatMessage('city') },
      {
        dataField: 'state',
        colSpan: 2,
        label: formatMessage('province'),
        editorOptions: {
          label: formatMessage('province'),
        }
      },
      {
        dataField: 'address',
        label: formatMessage('address'),
        colSpan: 2,
      },
      // {
      //   dataField: 'zipCode',
      //   editorType: 'dxNumberBox',
      //   colSpan: 2,
      // },
    ];
  }

  dataChanged() {
    this.isDataChanged = true;
  }

  setSavedData(data = this.profileData) {
    this.savedProfileData = JSON.parse(JSON.stringify(data));
  }

  copyToClipboard(text, evt) {
    window.navigator.clipboard?.writeText(text);
    const tipText = 'Text copied';
    notify({
        message: tipText,
        minWidth: `${tipText.length + 2}ch`,
        width: 'auto',
        position: {of: evt.target, offset:'0 -30'}
      },
      'info', 500);
  };

  changePassword() {
    this.isChangePasswordPopupOpened = true;
  };

  cancel() {
    this.profileData = this.savedProfileData;
    this.ref.detectChanges();
    this.setSavedData();

    setTimeout(() => {
      this.isDataChanged = false;
    });
  }

  save() {
    notify({message: 'Data saved', position: {at: 'bottom center', my: 'bottom center'}}, 'success');
    this.isDataChanged = false;
    this.setSavedData();
  }

  scroll({reachedTop = false}) {
    this.isContentScrolled = !reachedTop;
  }

}

@NgModule({
  imports: [
    DxButtonModule,
    DxDateBoxModule,
    DxFormModule,
    DxFileUploaderModule,
    DxNumberBoxModule,
    DxToolbarModule,
    DxSelectBoxModule,
    DxScrollViewModule,
    DxLoadPanelModule,
    DxTextBoxModule,
    
    FormTextboxModule,
    FormPhotoModule,
    FormPopupModule,
    ProfileCardModule,
    ChangeProfilePasswordModule,
    CommonModule,
    PhonePipeModule,
  ],
  providers: [],
  exports: [],
  declarations: [UserProfileComponent],
})
export class UserProfileListModule { }
