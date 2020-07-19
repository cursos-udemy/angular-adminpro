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
export class NavbarComponent implements OnInit, OnDestroy {

  public user: UserModel;
  private userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  //TODO: utilizar el usuario desde authService
  ngOnInit(): void {

    initPlugins();

    this.user = JSON.parse(localStorage.getItem('APP-USER')) as UserModel;
    this.userSubscription = this.authService.userInformation.subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
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
