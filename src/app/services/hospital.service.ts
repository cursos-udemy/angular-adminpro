import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {DataPaginator} from "../models/paginator";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserModel} from "../models/user.model";
import {HospitalModel} from "../models/hospital.model";

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  public find(page: number = 1, limit: number = 100): Observable<DataPaginator> {
    return this.http.get<DataPaginator>(`${environment.hospitalServiceUrl}/hospital?page=${page}&limit=${limit}`);
  }

  public findById(id: string): Observable<HospitalModel> {
    return this.http.get<HospitalModel>(`${environment.hospitalServiceUrl}/hospital/${id}`);
  }

  public search(text: string, page: number = 1, limit: number = 100): Observable<DataPaginator> {
    return this.http.get<DataPaginator>(`${environment.hospitalServiceUrl}/search/hospital/${text}?page=${page}&limit=${limit}`);
  }

  public update(id: string, newName: string) {
    const httpOptions = this.getHttpHeaders();
    return this.http.put<UserModel>(`${environment.hospitalServiceUrl}/hospital/${id}`, {name: newName}, httpOptions);
  }

  public delete(id: string): Observable<any> {
    const httpOptions = this.getHttpHeaders();
    return this.http.delete(`${environment.hospitalServiceUrl}/hospital/${id}`, httpOptions);
  }

  public save(hospitalName: string): Observable<HospitalModel> {
    const httpOptions = this.getHttpHeaders();
    return this.http.post<HospitalModel>(`${environment.hospitalServiceUrl}/hospital/`, {name: hospitalName}, httpOptions);
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
