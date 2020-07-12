import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

import {HospitalModel} from "../../../models/hospital.model";
import {HospitalService} from "../../../services/hospital.service";
import {ModalUploadService} from "../../../components/modal-upload/modal-upload.service";
import {DataPaginator} from "../../../models/paginator";

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit, OnDestroy {

  private uploadImageSubscription: Subscription;

  //public userAuthenticated: UserModel;
  public hospitals: HospitalModel[] = [];
  public itemsPerPage: number = 4;
  public currentPage: number = 1;
  public totalItems: number = 0;

  public loading: boolean = false;
  public searchText: string;

  constructor(
    private hospitalService: HospitalService,
    private toastr: ToastrService,
    private modalUploadService: ModalUploadService) {
  }

  ngOnInit(): void {
    //this.userAuthenticated = JSON.parse(localStorage.getItem('APP-USER')) as UserModel;
    this.getHospitals(this.currentPage, this.itemsPerPage);
    this.uploadImageSubscription = this.modalUploadService.uploadNotificationEvent
      .subscribe(upload => this.updateHospitalList());
  }

  ngOnDestroy() {
    this.uploadImageSubscription.unsubscribe();
  }

  public onPageChange(event: number) {
    this.currentPage = event;
    if (this.searchText && this.searchText.trim().length > 0) {
      this.searchHospitals(this.searchText, this.currentPage, this.itemsPerPage);
    } else {
      this.getHospitals(this.currentPage, this.itemsPerPage);
    }
  }

  public onKeyUpSearchText() {
    this.updateHospitalList();
  }

  private updateHospitalList() {
    if (this.searchText && this.searchText.trim().length > 0) {
      this.searchHospitals(this.searchText.trim(), 1, this.itemsPerPage);
    } else {
      this.getHospitals(this.currentPage, this.itemsPerPage);
    }
  }

  private getHospitals(page: number, limit: number) {
    this.loading = true;
    this.hospitalService.find(page, limit).subscribe(
      paginator => {
        this.handlePaginator(paginator);
        this.loading = false
      },
      err => this.loading = false,
    );
  }

  private searchHospitals(text: string, page: number, limit: number) {
    this.loading = true;
    this.hospitalService.search(text, page, limit).subscribe(
      paginator => {
        this.handlePaginator(paginator);
        this.loading = false
      },
      err => this.loading = false,
    );
  }

  private handlePaginator(paginator: DataPaginator): void {
    this.currentPage = paginator.page;
    this.totalItems = paginator.totalDocs;
    this.hospitals = (paginator.docs as HospitalModel[]);
  }

  public handleDeleteHospital(hospital: HospitalModel) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: `¿Are you sure to delete hospital ${hospital.name}?`,
      text: 'You will not be able to reverse this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Deleted!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.hospitalService.delete(hospital._id).subscribe(
          resp => {
            this.toastr.success(`User ${hospital.name} has been successfully removed.`, 'Congratulations', {
              closeButton: true, timeOut: 3000
            });
            this.hospitals = this.hospitals.filter(u => u._id != hospital._id);
            this.totalItems--;
          },
          err => this.toastr.error(err.error.message, 'Delete hospital failed!', {closeButton: true, timeOut: 3000})
        );
      }
    });
  }

  public handleUpdateHospital(hospital: HospitalModel) {
    this.hospitalService.update(hospital._id, hospital.name).subscribe(
      hospitalUpdated => {
        this.toastr.success(`Hospital has been successfully updated.`, 'Congratulations', {
          closeButton: true, timeOut: 3000
        });
        this.hospitals = this.hospitals.map( h => {
          if (h._id === hospitalUpdated._id) h.name = hospitalUpdated.name;
          return h;
        });
      },
      err => this.toastr.error(err.error.message, 'Update hospital failed!', {closeButton: true, timeOut: 3000})
    );
  }

  public isUserAdmin(): boolean {
    return true;
  }

  public openUploadImageModal(hospital: HospitalModel): void {
    this.modalUploadService.openModal('hospital', hospital._id, hospital.name, hospital.image);
  }

  public addHospitalModal() {
    Swal.fire({
      title: 'New Hospital',
      input: 'text',
      inputPlaceholder: 'Enter the hospital name',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return 'Hospital name is required!';
      }
    }).then(input => {
      if (input.isConfirmed) {
        const hospitalName: string = input.value as string;
        this.hospitalService.save(hospitalName).subscribe(
          newHospital => {
            this.toastr.success(`Hospital has been successfully created.`, 'Congratulations', {
              closeButton: true, timeOut: 3000
            });
            this.updateHospitalList();
          },
          err => this.toastr.error(err.error.message, 'Create hospital failed!', {closeButton: true, timeOut: 3000})
        );
      }
    }).catch(err => console.log(err));
  }
}
