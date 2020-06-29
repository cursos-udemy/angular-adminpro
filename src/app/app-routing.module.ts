import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {ProgressComponent} from "./pages/progress/progress.component";
import {NotFoundComponent} from "./shared/error/not-found/not-found.component";
import {HomeComponent} from "./pages/home.component";
import {RegisterComponent} from "./login/register.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'progress', component: ProgressComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
