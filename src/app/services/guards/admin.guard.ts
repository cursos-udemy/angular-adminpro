import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "../user.service";
import {AuthGuard} from "./auth.guard";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private userUService: UserService,
              private router: Router,
              private authGuard: AuthGuard) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (!this.authGuard.canActivate(next, state)) return false;

    //recuperar el token desde un service GET.
    const token = localStorage.getItem('APP-TOKEN');
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.roles.includes('ROLE_ADMIN');
  }

}
