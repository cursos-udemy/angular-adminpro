import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {tap} from "rxjs/operators";

import {environment} from "../../environments/environment";
import {UserModel, UserSignInModel, UserSignUpModel} from "../models/user.model";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {DataPaginator} from "../models/paginator";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userAuthenticated: Subject<UserModel> = new Subject<UserModel>()

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  get userInformation() {
    return this.userAuthenticated;
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

  public logout() {
    this.handlerLogoutSuccess();
    const endpoint = `${environment.hospitalServiceUrl}/auth/logout`;
    this.http.post(endpoint, {});
    this.toastr.info(`Good Bye!`, 'Logout success', {
      closeButton: true, progressAnimation: "decreasing", progressBar: true, timeOut: 3000
    });
    this.router.navigateByUrl("/login");
  }

  public updateProfile(id: string, user: UserModel) {
    const token = localStorage.getItem('APP-TOKEN');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.put<UserModel>(`${environment.hospitalServiceUrl}/user/profile/${id}`, {...user}, httpOptions)
      .pipe(tap(userUpdated => this.handleUpdateProfile(userUpdated)));
  }

  public updateRole(id: string, newRole: string) {
    const token = localStorage.getItem('APP-TOKEN');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.put<UserModel>(`${environment.hospitalServiceUrl}/user/admin/${id}`, {role: newRole}, httpOptions);
  }

  public updateImage(userUpdated) {
    localStorage.setItem('APP-USER', JSON.stringify(userUpdated));
    this.userAuthenticated.next(userUpdated);
  }

  private handlerLoginSuccess(userAuthenticated) {
    localStorage.setItem('APP-USER', JSON.stringify(userAuthenticated.user));
    localStorage.setItem('APP-USER-ID', userAuthenticated.user._id);
    localStorage.setItem('APP-TOKEN', userAuthenticated.accessToken);
    this.userAuthenticated.next(userAuthenticated.user);
  }

  private handlerLogoutSuccess() {
    localStorage.removeItem('APP-USER-ID');
    localStorage.removeItem('APP-USER');
    localStorage.removeItem('APP-TOKEN');
  }

  private handleUpdateProfile(userUpdated) {
    localStorage.setItem('APP-USER', JSON.stringify(userUpdated));
    this.userAuthenticated.next(userUpdated);
  }

  public find(page: number = 1, limit: number = 100): Observable<DataPaginator> {
    return this.http.get<DataPaginator>(`${environment.hospitalServiceUrl}/user?page=${page}&limit=${limit}`);
  }

  public search(text: string, page: number = 1, limit: number = 100): Observable<DataPaginator> {
    return this.http.get<DataPaginator>(`${environment.hospitalServiceUrl}/search/user/${text}?page=${page}&limit=${limit}`);
  }

  public delete(id: string): Observable<any> {
    const token = localStorage.getItem('APP-TOKEN');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.delete(`${environment.hospitalServiceUrl}/user/${id}`, httpOptions);
  }
}
