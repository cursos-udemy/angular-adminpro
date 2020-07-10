import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  public upload(file: File, id: string, modelType: string): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('image', file);
    const req = new HttpRequest('POST', `${environment.hospitalServiceUrl}/image/upload/${modelType}/${id}`, formData, { reportProgress: true });
    return this.http.request(req);
  }
}
