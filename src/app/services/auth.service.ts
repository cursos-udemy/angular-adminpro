import {Injectable} from '@angular/core';
import {UserModel, UserSignInModel, UserSignUpModel} from "../models/user.model";
import {Observable, Subject} from "rxjs";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MenuItem} from "./sidebar.service";

const KEY_ITEM_USER: string = 'APP-USER';
const KEY_TIEM_TOKEN: string = 'APP-TOKEN';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: UserModel;
  private _token: string;
  private _menu: MenuItem[];

  public auth2: any;
  private userAuthenticated: Subject<UserModel> = new Subject<UserModel>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService) {
    this.googleInit();
    const menuStored = localStorage.getItem('APP-MENU');
    const userStored = localStorage.getItem('APP-USER');

    this._menu = [];
    if (menuStored) this._menu = JSON.parse(menuStored);

    this._user = null;
    if (userStored) this._user = JSON.parse(userStored);
  }

  public get userInformation() {
    return this.userAuthenticated;
  }

  public get user(): UserModel {
    if (this._user != null) return this._user;
    if (sessionStorage.getItem(KEY_ITEM_USER) != null) {
      this._user = JSON.parse(sessionStorage.getItem(KEY_ITEM_USER)) as UserModel
      return this._user
    }
    return {_id: null, name: null, role: null, email: null, googleAccount: false};
  }

  public get token(): string {
    if (this._token != null) return this._token;
    if (sessionStorage.getItem(KEY_TIEM_TOKEN) != null) {
      this._token = sessionStorage.getItem(KEY_TIEM_TOKEN);
      return this._token;
    }
    return null;
  }

  public get menu(): MenuItem[] {
    return this._menu;
  }

  public googleInit() {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '220412093307-obj46sqtus2450vgconvm460ieticfgo.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        resolve();
      });
    })
  }


  public isAuthenticated(): boolean {
    if (!this.token) return false;
    return !this.isTokenExpired();
  }

  private isTokenExpired(): boolean {
    const {exp} = this.getPayload(this.token);
    if (!exp) return false;
    const time = (new Date()).getTime() / 1000;
    return exp < time;
  }


  public signIn(user: UserSignInModel): Observable<any> {
    const endpoint = `${environment.hospitalServiceUrl}/auth/login`;
    return this.http.post<any>(endpoint, {email: user.email, password: user.password})
      .pipe(tap(loginSuccess => this.handlerLoginSuccess(loginSuccess)));
  }

  public signInGoogle(token: String): Observable<any> {
    const endpoint = `${environment.hospitalServiceUrl}/auth/login/google`;
    return this.http.post<any>(endpoint, {token})
      .pipe(tap(loginSuccess => this.handlerLoginSuccess(loginSuccess)));
  }

  public signUp(user: UserSignUpModel): Observable<UserModel> {
    const endpoint = `${environment.hospitalServiceUrl}/user/signup`;
    return this.http.post<UserModel>(endpoint, {...user});
  }

  public logout() {
    this.handlerLogoutSuccess();
    //const endpoint = `${environment.hospitalServiceUrl}/auth/logout`;
    //this.http.post(endpoint, {});
    this.toastr.info(`Good Bye!`, 'Logout success', {
      closeButton: true, progressAnimation: "decreasing", progressBar: true, timeOut: 3000
    });

    // if (this.user.googleAccount) {
    //   this.auth2.signOut()
    //     .then(() => this.ngZone.run(() => console.log('logout google OK')))
    //     .catch(err => console.warn('logout google ERROR', err));
    // }

    this.router.navigateByUrl('/login');
  }

  public notifyUserUpdated(userUpdated: UserModel) {
    localStorage.setItem('APP-USER', JSON.stringify(userUpdated));
    this._user = userUpdated;
    this.userAuthenticated.next(userUpdated);
  }

  private handlerLoginSuccess(userAuthenticated) {
    localStorage.setItem('APP-USER', JSON.stringify(userAuthenticated.user));
    localStorage.setItem('APP-TOKEN', userAuthenticated.accessToken);
    localStorage.setItem('APP-MENU', JSON.stringify(userAuthenticated.menu));
    this._menu = userAuthenticated.menu;
    this._user = userAuthenticated.user;
    this.userAuthenticated.next(userAuthenticated.user);
  }

  private handlerLogoutSuccess() {
    //localStorage.removeItem('APP-USER-ID');
    this._menu = [];
    this._user = null;
    localStorage.removeItem('APP-USER');
    localStorage.removeItem('APP-TOKEN');
    localStorage.removeItem('APP-MENU');
  }

  public hasRoleAdmin(): boolean {
    return this.hasRole("ROLE_ADMIN");
  }

  public hasRoleUser(): boolean {
    return this.hasRole("ROLE_USER");
  }

  private hasRole(role: string): boolean {
    //return this.user.roles.includes(role);
    return this.user.role === role;
  }

  private getPayload(token: string): any {
    return JSON.parse(atob(token.split(".")[1]));
  }

}
