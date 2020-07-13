import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

import {HospitalModel} from "../../../models/hospital.model";
import {DoctorService} from "../../../services/doctor.service";
import {HospitalService} from "../../../services/hospital.service";
import {DoctorRequest} from "../../../models/doctor.model";
import {ModalUploadService} from "../../../components/modal-upload/modal-upload.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styles: []
})
export class DoctorFormComponent implements OnInit, OnDestroy {

  public hospitals: HospitalModel[];
  public doctor: DoctorRequest;
  public hospital: HospitalModel;

  private uploadImageSubscription: Subscription;

  constructor(
    private doctorService: DoctorService,
    private hospitalService: HospitalService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private modalUploadService: ModalUploadService) {
    this.doctor = {name: null, hospital: ''};
    this.hospital = {_id: null, name: null};
  }

  ngOnInit() {
    this.hospitalService.find().subscribe(
      paginator => this.hospitals = paginator.docs
    );

    this.route.params.subscribe(params => {
      const doctorId = params['id'];
      if (doctorId) this.loadDoctor(doctorId);
    });

    this.uploadImageSubscription = this.modalUploadService.uploadNotificationEvent
      .subscribe(upload => this.doctor.image = upload.modelUpdated.image);
  }

  ngOnDestroy() {
    this.uploadImageSubscription.unsubscribe();
  }

  private loadDoctor(id: string) {
    this.doctorService.findById(id).subscribe(
      doctor => {
        if (doctor) {
          this.hospital = doctor.hospital;
          this.doctor = {...doctor, hospital: doctor.hospital._id};
        } else {
          this.router.navigateByUrl('/doctors');
          this.toastr.error('doctor not found', 'find doctor failed!', {closeButton: true, timeOut: 3000})
        }
      },
      err => {
        console.error(err)
        this.toastr.error('doctor not found', 'find doctor failed!', {closeButton: true, timeOut: 3000})
        this.router.navigateByUrl('/doctors');
      }
    )
  }

  public handleSumbit(form: NgForm): void {
    if (form.invalid) return;
    const doctorRequest = form.value as DoctorRequest;
    if (!this.doctor._id) {
      this.createDoctor(doctorRequest);
    } else {
      this.updateDoctor(doctorRequest);
    }
  }

  private createDoctor(doctor: DoctorRequest) {
    this.doctorService.save(doctor).subscribe(
      newDoctor => {
        this.toastr.success(`Doctor ${newDoctor.name} has been successfully created.`, 'Congratulations', {
          closeButton: true, timeOut: 3000
        });
        this.router.navigateByUrl(`/doctor/${newDoctor._id}`);
      },
      err => this.toastr.error(err.error.message, 'Create doctor failed!', {closeButton: true, timeOut: 3000})
    );
  }

  private updateDoctor(doctor: DoctorRequest) {
    this.doctorService.update(this.doctor._id, doctor).subscribe(
      doctorUpdated => {
        this.toastr.success(`Doctor ${doctorUpdated.name} has been successfully updated.`, 'Congratulations', {
          closeButton: true, timeOut: 3000
        });
      },
      err => this.toastr.error(err.error.message, 'Update doctor failed!', {closeButton: true, timeOut: 3000})
    );
  }

  public isUserAdmin(): boolean {
    return true;
  }

  public onChangeHospital(event: any) {
    const hospitalId = event.target.value;
    this.loadHospital(hospitalId);
  }

  private loadHospital(id: string): void {
    if (id) {
      this.hospitalService.findById(id).subscribe(
        hospital => this.hospital = hospital,
        err => this.hospital = {_id: null, name: null}
      );
    } else {
      this.hospital = {_id: null, name: null};
    }
  }

  public openUploadImageModal(): void {
    this.modalUploadService.openModal('doctor', this.doctor._id, this.doctor.name, this.doctor.image);
  }
}
