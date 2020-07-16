import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {tap} from "rxjs/operators";

import {environment} from "../../environments/environment";
import {UserModel, UserSignUpModel} from "../models/user.model";
import {DataPaginator} from "../models/paginator";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userAuthenticated: Subject<UserModel> = new Subject<UserModel>();

  constructor(private http: HttpClient) {
  }

  public isUserAuthenticated(): boolean {
    return !!localStorage.getItem('APP-TOKEN');
  }

  public signUp(user: UserSignUpModel): Observable<UserModel> {
    const endpoint = `${environment.hospitalServiceUrl}/user/signup`;
    return this.http.post<UserModel>(endpoint, {...user});
  }

  public updateProfile(id: string, user: UserModel) {
    const httpOptions = this.getHttpHeaders();
    return this.http.put<UserModel>(`${environment.hospitalServiceUrl}/user/profile/${id}`, {...user}, httpOptions)
      .pipe(tap(userUpdated => this.handleUpdateProfile(userUpdated)));
  }

  public updateRole(id: string, newRole: string) {
    const httpOptions = this.getHttpHeaders();
    return this.http.put<UserModel>(`${environment.hospitalServiceUrl}/user/admin/${id}`, {role: newRole}, httpOptions);
  }

  public updateImage(userUpdated) {
    localStorage.setItem('APP-USER', JSON.stringify(userUpdated));
    this.userAuthenticated.next(userUpdated);
  }

  private handleUpdateProfile(userUpdated) {
    localStorage.setItem('APP-USER', JSON.stringify(userUpdated));
    this.userAuthenticated.next(userUpdated);
  }

  public find(page: number = 1, limit: number = 100): Observable<DataPaginator> {
    const httpOptions = this.getHttpHeaders();
    return this.http.get<DataPaginator>(`${environment.hospitalServiceUrl}/user?page=${page}&limit=${limit}`, httpOptions);
  }

  public search(text: string, page: number = 1, limit: number = 100): Observable<DataPaginator> {
    const httpOptions = this.getHttpHeaders();
    return this.http.get<DataPaginator>(`${environment.hospitalServiceUrl}/search/user/${text}?page=${page}&limit=${limit}`, httpOptions);
  }

  public delete(id: string): Observable<any> {
    const httpOptions = this.getHttpHeaders();
    return this.http.delete(`${environment.hospitalServiceUrl}/user/${id}`, httpOptions);
  }

  private getHttpHeaders() {
    const token = localStorage.getItem('APP-TOKEN');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }
}
