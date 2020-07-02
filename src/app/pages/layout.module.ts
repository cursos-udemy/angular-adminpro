import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";

import {LayoutRoutingModule} from './layout-routing.module';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {LayoutComponent} from "./layout.component";
import {SharedModule} from "../shared/shared.module";
import {IncrementerComponent} from "../components/incrementer/incrementer.component";
import {DonutsChartComponent} from '../components/charts/donut-chart/donuts-chart.component';
import {ChartsModule} from 'ng2-charts';
import {ChartComponent} from './charts/chart/chart.component';
import {AccountSettingComponent} from './account-setting/account-setting.component';
import {PromisesComponent} from './promises/promises.component';
import {RxjsComponent} from './rxjs/rxjs.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    LayoutComponent,
    IncrementerComponent,
    DonutsChartComponent,
    ChartComponent,
    AccountSettingComponent,
    PromisesComponent,
    RxjsComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    LayoutComponent,
    LayoutRoutingModule
  ]
})
export class LayoutModule {
}
