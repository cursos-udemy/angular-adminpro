import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LayoutComponent} from "./layout.component";
import {AuthGuard} from "../services/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import("./layout-child-routing.module").then(m => m.LayoutChildRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
