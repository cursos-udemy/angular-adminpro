import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../services/sidebar.service";
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public user: UserModel;

  constructor(
    public sidebarService: SidebarService,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('APP-USER')) as UserModel;
    this.userService.userInformation.subscribe(user => this.user = user);
  }

  public logout(): void {
    this.userService.logout();
  }
}

