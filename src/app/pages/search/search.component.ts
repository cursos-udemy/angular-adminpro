import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../environments/environment";
import {UserModel} from "../../models/user.model";
import {HospitalModel} from "../../models/hospital.model";
import {DoctorModel} from "../../models/doctor.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  public users: UserModel[] = [];
  public hospitals: HospitalModel[] = [];
  public doctors: DoctorModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const text = params['text'];
      this.search(text);
    })
  }

  private search(text: string) {
    return this.http.get<any>(`${environment.hospitalServiceUrl}/search/all/${text}?limit=1000`).subscribe(
      result => {
        this.users = result.users.docs;
        this.hospitals = result.hospitals.docs;
        this.doctors = result.doctors.docs;
      }
    );
  }

}
