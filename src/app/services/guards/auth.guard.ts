import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from "../user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  canActivate(): boolean {
    const authenticated = this.userService.isUserAuthenticated();
    if (!authenticated) this.router.navigateByUrl("/login");
    return authenticated;
  }
}
