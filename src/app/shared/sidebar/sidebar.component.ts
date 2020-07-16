import {Component, OnDestroy, OnInit} from '@angular/core';
import {SidebarService} from "../../services/sidebar.service";
import {UserModel} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";

declare function initPlugins();

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  public user: UserModel;
  //private userSubscription: Subscription;

  constructor(
    public sidebarService: SidebarService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    initPlugins();

    this.user = JSON.parse(localStorage.getItem('APP-USER')) as UserModel;
    this.authService.userInformation.subscribe(user => {
      this.user = user;
      this.sidebarService.loadMenu();
    });
  }

  ngOnDestroy() {
    //this.userSubscription.unsubscribe();
  }

  public logout(): void {
    this.authService.logout();
  }
}

