import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  public user: UserModel;
  private userSubscription: Subscription;

  constructor(
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('APP-USER')) as UserModel;
    this.userSubscription = this.userService.userInformation.subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  public logout(): void {
    this.userService.logout();
  }

  public search(value: string) {
    if (value) {
      this.router.navigate(["/search", value]);
    }
  }
}
