import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from "./login/login.component";
import {NotFoundComponent} from "./shared/error/not-found/not-found.component";
import {RegisterComponent} from "./login/register.component";
import {LayoutRoutingModule} from "./pages/layout-routing.module";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    LayoutRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
