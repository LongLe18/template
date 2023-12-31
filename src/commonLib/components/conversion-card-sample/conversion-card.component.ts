import {
  Component, NgModule, Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardAnalyticsModule } from 'src/commonLib/components/card-analytics/card-analytics.component';
import { DxFunnelModule } from 'devextreme-angular/ui/funnel';
import { SalesOrOpportunitiesByCategory } from 'src/commonLib/constants/types/analytics';

@Component({
  selector: 'conversion-card',
  templateUrl: 'conversion-card.component.html',
})
export class ConversionCardComponent {
  @Input() data: SalesOrOpportunitiesByCategory;

  customizeOppText(arg: { valueText: string }) {
    return `$${arg.valueText}`;
  }
}

@NgModule({
  imports: [
    CommonModule,
    CardAnalyticsModule,
    DxFunnelModule,
  ],
  declarations: [ConversionCardComponent],
  exports: [ConversionCardComponent],
})
export class ConversionCardModule { }
