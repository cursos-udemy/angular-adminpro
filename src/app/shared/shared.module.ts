import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {NotFoundComponent} from "./error/not-found/not-found.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {PipesModule} from "../pipes/pipes.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ],
  declarations: [
    BreadcrumbComponent,
    NotFoundComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  exports: [
    BreadcrumbComponent,
    NotFoundComponent,
    NavbarComponent,
    SidebarComponent,
  ]
})
export class SharedModule {
}
