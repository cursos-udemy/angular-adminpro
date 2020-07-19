import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

import {Subscription} from "rxjs";
import {delay} from "rxjs/operators";

import {DoctorService} from "../../../services/doctor.service";
import {HospitalService} from "../../../services/hospital.service";
import {ModalUploadService} from "../../../components/modal-upload/modal-upload.service";
import {HospitalModel} from "../../../models/hospital.model";
import {DoctorModel, DoctorRequest} from "../../../models/doctor.model";

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styles: []
})
export class DoctorFormComponent implements OnInit, OnDestroy {

  public hospitals: HospitalModel[];
  public doctor: DoctorModel;
  public hospitalModel: HospitalModel;
  public form: FormGroup;

  private uploadImageSubscription: Subscription;

  constructor(
    private doctorService: DoctorService,
    private hospitalService: HospitalService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalUploadService: ModalUploadService) {

    this.doctor = null;
    this.hospitalModel = {_id: null, name: null};

    this.form = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });
  }

  get name() {
    return this.form.get('name');
  }

  get hospital() {
    return this.form.get('hospital');
  }

  ngOnInit() {
    this.hospitals = [];
    this.route.params.subscribe(params => {
      const doctorId = params['id'];
      if (doctorId) this.loadDoctor(doctorId);
    });

    this.hospitalService.find().subscribe(
      paginator => this.hospitals = paginator.docs
    );

    this.hospital.valueChanges.subscribe(newValue => {
      this.hospitalModel = {_id: null, name: null};
      if (newValue) {
        const hospital = this.hospitals.find(h => h._id === newValue);
        if (hospital) this.hospitalModel = hospital;
      }
    });

    this.uploadImageSubscription = this.modalUploadService.uploadNotificationEvent
      .subscribe(upload => this.doctor.image = upload.modelUpdated.image);
  }

  ngOnDestroy() {
    this.uploadImageSubscription.unsubscribe();
  }

  private loadDoctor(id: string) {
    this.doctorService.findById(id)
      .pipe(delay(0))
      .subscribe(
        doctor => {
          if (doctor) {
            this.doctor = doctor;
            this.hospitalModel = doctor.hospital;
            this.form.setValue({name: doctor.name, hospital: this.hospitalModel._id});
          } else {
            this.router.navigateByUrl('/doctors');
            this.toastr.error('doctor not found', 'find doctor failed!', {closeButton: true, timeOut: 3000})
          }
        },
        err => {
          this.toastr.error(err.error.message, 'find doctor failed!', {closeButton: true, timeOut: 3000})
          this.router.navigateByUrl('/doctors');
        }
      )
  }

  public handleSumbit(): void {
    if (this.form.invalid) return;
    const doctorRequest = this.form.value as DoctorRequest;
    if (!this.doctor) {
      this.createDoctor(doctorRequest);
    } else {
      this.updateDoctor(this.doctor._id, doctorRequest);
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
      err => {
        console.log(err);
        this.toastr.error(err.error.message, 'Create doctor failed!', {closeButton: true, timeOut: 3000})
      }
    );
  }

  private updateDoctor(id, doctor: DoctorRequest) {
    this.doctorService.update(id, doctor).subscribe(
      doctorUpdated => {
        this.toastr.success(`Doctor ${doctorUpdated.name} has been successfully updated.`, 'Congratulations', {
          closeButton: true, timeOut: 3000
        });
      },
      err => this.toastr.error(err.error.message, 'Update doctor failed!', {closeButton: true, timeOut: 3000})
    );
  }

  //TODO: consulta a authService
  public isUserAdmin(): boolean {
    return true;
  }

  public openUploadImageModal(): void {
    this.modalUploadService.openModal('doctor', this.doctor._id, this.doctor.name, this.doctor.image);
  }
}
