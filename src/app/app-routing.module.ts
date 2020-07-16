import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {NotFoundComponent} from "./shared/error/not-found/not-found.component";
import {LayoutRoutingModule} from "./pages/layout-routing.module";
import {AuthRoutingModule} from "./auth/auth-routing.module";

const routes: Routes = [
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    AuthRoutingModule,
    LayoutRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
