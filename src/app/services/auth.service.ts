import {Injectable} from '@angular/core';
import {UserModel} from "../models/user.model";

const KEY_ITEM_USER: string = 'APP-USER';
const KEY_TIEM_TOKEN: string = 'APP-TOKEN';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: UserModel;
  private _token: string;

  constructor() {
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
