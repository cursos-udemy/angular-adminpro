import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {DataPaginator} from "../models/paginator";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DoctorModel, DoctorRequest} from "../models/doctor.model";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) {
  }

  public find(page: number = 1, limit: number = 100): Observable<DataPaginator> {
    const httpOptions = this.getHttpHeaders();
    return this.http.get<DataPaginator>(`${environment.hospitalServiceUrl}/doctor?page=${page}&limit=${limit}`, httpOptions);
  }

  public findById(id: string): Observable<DoctorModel> {
    const httpOptions = this.getHttpHeaders();
    return this.http.get<DoctorModel>(`${environment.hospitalServiceUrl}/doctor/${id}`, httpOptions);
  }

  public search(text: string, page: number = 1, limit: number = 100): Observable<DataPaginator> {
    const httpOptions = this.getHttpHeaders();
    return this.http.get<DataPaginator>(`${environment.hospitalServiceUrl}/search/doctor/${text}?page=${page}&limit=${limit}`, httpOptions);
  }

  public delete(id: string): Observable<any> {
    const httpOptions = this.getHttpHeaders();
    return this.http.delete(`${environment.hospitalServiceUrl}/doctor/${id}`, httpOptions);
  }

  public save(doctor: DoctorRequest): Observable<DoctorModel> {
    const httpOptions = this.getHttpHeaders();
    return this.http.post<DoctorModel>(`${environment.hospitalServiceUrl}/doctor`, doctor, httpOptions);
  }

  public update(id: string, doctor: DoctorRequest): Observable<DoctorModel> {
    const httpOptions = this.getHttpHeaders();
    return this.http.put<DoctorModel>(`${environment.hospitalServiceUrl}/doctor/${id}`, doctor, httpOptions);
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
