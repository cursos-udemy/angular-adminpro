import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from "./layout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {ChartComponent} from "./charts/chart/chart.component";
import {AccountSettingComponent} from "./account-setting/account-setting.component";
import {PromisesComponent} from "./promises/promises.component";
import {RxjsComponent} from "./rxjs/rxjs.component";


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'account-setting', component: AccountSettingComponent},
      {path: 'progress', component: ProgressComponent},
      {path: 'chart', component: ChartComponent},
      {path: 'promises', component: PromisesComponent},
      {path: 'rxjs', component: RxjsComponent},
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
