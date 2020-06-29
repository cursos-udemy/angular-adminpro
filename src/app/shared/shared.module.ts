import {NgModule} from '@angular/core';
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {NotFoundComponent} from "./error/not-found/not-found.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {SidebarComponent} from "./sidebar/sidebar.component";

@NgModule({
  declarations: [
    BreadcrumbComponent,
    NotFoundComponent,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    BreadcrumbComponent,
    NotFoundComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class SharedModule {
}
