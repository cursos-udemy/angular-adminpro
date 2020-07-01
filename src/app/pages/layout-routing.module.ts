import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from "./layout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {ChartComponent} from "./charts/chart/chart.component";
import {AccountSettingComponent} from "./account-setting/account-setting.component";


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'progress', component: ProgressComponent},
      {path: 'chart', component: ChartComponent},
      {path: 'account-setting', component: AccountSettingComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
