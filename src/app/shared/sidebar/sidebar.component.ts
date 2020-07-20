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
export class SidebarComponent implements OnInit {

  constructor(
    public sidebarService: SidebarService,
    private authService: AuthService) {
  }

  public get user(): UserModel {
    return this.authService.userAuthenticated;
  }

  ngOnInit(): void {
    initPlugins();
    this.sidebarService.loadMenu();
  }

  public logout(): void {
    this.authService.logout();
  }
}

