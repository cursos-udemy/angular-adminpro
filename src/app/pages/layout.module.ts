import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutRoutingModule} from './layout-routing.module';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {LayoutComponent} from "./layout.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
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
