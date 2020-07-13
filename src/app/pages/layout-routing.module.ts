import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LayoutComponent} from "./layout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {ChartComponent} from "./charts/chart/chart.component";
import {AccountSettingComponent} from "./account-setting/account-setting.component";
import {PromisesComponent} from "./promises/promises.component";
import {RxjsComponent} from "./rxjs/rxjs.component";
import {AuthGuard} from "../services/guards/auth.guard";
import {ProfileComponent} from "./profile/profile.component";
import {UsersComponent} from "./admin/users/users.component";
import {HospitalsComponent} from "./admin/hospitals/hospitals.component";
import {DoctorsComponent} from "./admin/doctors/doctors.component";
import {DoctorFormComponent} from "./admin/doctors/doctor-form.component";
import {SearchComponent} from "./search/search.component"

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'}, canActivate: [AuthGuard]},
      {path: 'account-setting', component: AccountSettingComponent, data: {title: 'Account Setting'}, canActivate: [AuthGuard]},
      {path: 'progress', component: ProgressComponent, data: {title: 'Progress'}, canActivate: [AuthGuard]},
      {path: 'chart', component: ChartComponent, data: {title: 'Chart'}, canActivate: [AuthGuard]},
      {path: 'promises', component: PromisesComponent, data: {title: 'Promises'}, canActivate: [AuthGuard]},
      {path: 'rxjs', component: RxjsComponent, data: {title: 'RxJs'}, canActivate: [AuthGuard]},
      {path: 'profile', component: ProfileComponent, data: {title: 'Profile'}, canActivate: [AuthGuard]},
      {path: 'users', component: UsersComponent, data: {title: 'Users'}, canActivate: [AuthGuard]},
      {path: 'hospitals', component: HospitalsComponent, data: {title: 'Hospitals'}, canActivate: [AuthGuard]},
      {path: 'doctors', component: DoctorsComponent, data: {title: 'Doctors'}, canActivate: [AuthGuard]},
      {path: 'doctor', component: DoctorFormComponent, data: {title: 'New Doctor'}, canActivate: [AuthGuard]},
      {path: 'doctor/:id', component: DoctorFormComponent, data: {title: 'Edit Doctor'}, canActivate: [AuthGuard]},
      {path: 'search/:text', component: SearchComponent, data: {title: 'Search'}, canActivate: [AuthGuard]},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
