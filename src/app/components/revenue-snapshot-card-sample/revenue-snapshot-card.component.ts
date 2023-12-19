import {
  Component,
  NgModule,
  Input,
} from '@angular/core';
import { CardAnalyticsModule } from '../card-analytics/card-analytics.component';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { SalesByStateAndCity } from 'src/app/constants/types/analytics';

@Component({
  selector: 'revenue-snapshot-card',
  templateUrl: './revenue-snapshot-card.component.html',
})
export class RevenueSnapshotCardComponent {
  @Input() data: SalesByStateAndCity;

  customizeSaleText(arg: { percentText: string }) {
    return arg.percentText;
  }
}

@NgModule({
  imports: [
    CardAnalyticsModule,
    DxPieChartModule,
  ],
  declarations: [RevenueSnapshotCardComponent],
  exports: [RevenueSnapshotCardComponent],
})
export class RevenueSnapshotCardModule { }
