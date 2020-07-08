import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../services/sidebar.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    public sidebarService: SidebarService,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
  }

  public logout(): void {
    this.userService.logout();
  }
}

