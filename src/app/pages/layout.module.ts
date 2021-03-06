import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChartsModule} from 'ng2-charts';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxLoadingModule} from "ngx-loading";

import {LayoutRoutingModule} from './layout-routing.module';
import {SharedModule} from "../shared/shared.module";
import {PipesModule} from "../pipes/pipes.module";

import {LayoutComponent} from "./layout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProgressComponent} from "./progress/progress.component";
import {IncrementerComponent} from "../components/incrementer/incrementer.component";
import {DonutsChartComponent} from '../components/charts/donut-chart/donuts-chart.component';
import {ChartComponent} from './charts/chart/chart.component';
import {AccountSettingComponent} from './account-setting/account-setting.component';
import {PromisesComponent} from './promises/promises.component';
import {RxjsComponent} from './rxjs/rxjs.component';
import {ProfileComponent} from './profile/profile.component';
import {UsersComponent} from './admin/users/users.component';
import {ModalUploadComponent} from "../components/modal-upload/modal-upload.component";
import {HospitalsComponent} from './admin/hospitals/hospitals.component';
import { DoctorsComponent } from './admin/doctors/doctors.component';
import { DoctorFormComponent } from './admin/doctors/doctor-form.component';
import { SearchComponent } from './search/search.component';

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
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    ModalUploadComponent,
    HospitalsComponent,
    DoctorsComponent,
    DoctorFormComponent,
    SearchComponent
  ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        SharedModule,
        FormsModule,
        ChartsModule,
        PipesModule,
        NgxPaginationModule,
        NgxLoadingModule.forRoot({}),
        ReactiveFormsModule,
    ],
  exports: [
    LayoutRoutingModule
  ]
})
export class LayoutModule {
}
