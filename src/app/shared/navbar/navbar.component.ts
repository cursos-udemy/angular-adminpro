import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

declare function initPlugins();

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  public get userAuthenticated(): UserModel {
    return this.authService.userAuthenticated;
  }

  //TODO: utilizar el usuario desde authService
  ngOnInit(): void {
    initPlugins();
  }

  public logout(): void {
    this.authService.logout();
  }

  public search(value: string) {
    if (value) {
      this.router.navigate(["/search", value]);
    }
  }
}
