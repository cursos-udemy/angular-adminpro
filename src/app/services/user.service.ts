import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

import {environment} from "../../environments/environment";
import {UserModel, UserSignInModel, UserSignUpModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public isUserAuthenticated(): boolean {
    return !!localStorage.getItem('APP-TOKEN');
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

  private handlerLoginSuccess(userAuthenticated) {
    localStorage.setItem('APP-USER-ID', userAuthenticated.userId);
    localStorage.setItem('APP-TOKEN', userAuthenticated.accessToken);
  }

  private handlerLogoutSuccess(userAuthenticated) {
    localStorage.removeItem('APP-USER-ID');
    localStorage.removeItem('APP-TOKEN');
  }
}
