import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DoctorModel} from "../../../models/doctor.model";
import {DoctorService} from "../../../services/doctor.service";
import {ToastrService} from "ngx-toastr";
import {ModalUploadService} from "../../../components/modal-upload/modal-upload.service";
import {DataPaginator} from "../../../models/paginator";
import Swal from "sweetalert2";

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit, OnDestroy {

  private uploadImageSubscription: Subscription;

  public doctors: DoctorModel[] = [];
  public itemsPerPage: number = 4;
  public currentPage: number = 1;
  public totalItems: number = 0;

  public loading: boolean = false;
  public searchText: string;

  constructor(
    private doctorService: DoctorService,
    private toastr: ToastrService,
    private modalUploadService: ModalUploadService) {
  }

  //TODO: utilizar form builder
  ngOnInit(): void {
    this.getDoctors(this.currentPage, this.itemsPerPage);
    this.uploadImageSubscription = this.modalUploadService.uploadNotificationEvent
      .subscribe(upload => {
        const doctorUpdated = this.doctors.find(d => d._id === upload.modelUpdated._id);
        if (doctorUpdated) doctorUpdated.image = upload.modelUpdated.image;
      });
  }

  ngOnDestroy() {
    this.uploadImageSubscription.unsubscribe();
  }

  public onPageChange(event: number) {
    this.currentPage = event;
    this.updateDoctorList();
  }

  public onKeyUpSearchText() {
    this.updateDoctorList();
  }

  private updateDoctorList() {
    if (this.searchText && this.searchText.trim().length > 0) {
      this.searchDoctors(this.searchText.trim(), 1, this.itemsPerPage);
    } else {
      this.getDoctors(this.currentPage, this.itemsPerPage);
    }
  }

  private getDoctors(page: number, limit: number) {
    this.loading = true;
    this.doctorService.find(page, limit).subscribe(
      paginator => {
        this.handlePaginator(paginator);
        this.loading = false
      },
      err => this.loading = false,
    );
  }

  private searchDoctors(text: string, page: number, limit: number) {
    this.loading = true;
    this.doctorService.search(text, page, limit).subscribe(
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
    this.doctors = (paginator.docs as DoctorModel[]);
  }

  public openUploadImageModal(doctor: DoctorModel): void {
    this.modalUploadService.openModal('doctor', doctor._id, doctor.name, doctor.image);
  }

  public handleDeleteDoctor(doctor: DoctorModel) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: `¿Are you sure to delete doctor ${doctor.name}?`,
      text: 'You will not be able to reverse this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Deleted!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.doctorService.delete(doctor._id).subscribe(
          resp => {
            this.toastr.success(`User ${doctor.name} has been successfully removed.`, 'Congratulations', {
              closeButton: true, timeOut: 3000
            });
            this.doctors = this.doctors.filter(u => u._id != doctor._id);
            this.totalItems--;
          },
          err => this.toastr.error(err.error.message, 'Delete doctor failed!', {closeButton: true, timeOut: 3000})
        );
      }
    });
  }

  //TODO: consultar a authService
  public isUserAdmin(): boolean {
    return true;
  }
}
