import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.processGuard();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.processGuard();
  }

  private processGuard() {
    const authenticated = this.authService.isAuthenticated();
    console.log('user-authenticated: ', authenticated);
    if (!authenticated) this.router.navigateByUrl("/login");
    return authenticated;
  }
}
