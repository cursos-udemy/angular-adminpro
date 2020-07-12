import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {DataPaginator} from "../../../models/paginator";
import Swal from "sweetalert2";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {ModalUploadService} from "../../../components/modal-upload/modal-upload.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: []
})
export class UsersComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;
  private uploadImageSubscription: Subscription;

  public userAuthenticated: UserModel;
  public itemsPerPage: number = 4;
  public currentPage: number = 1;
  public totalItems: number = 0;
  public users: UserModel[] = [];
  public loading: boolean = false;
  public searchText: string;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private modalUploadService: ModalUploadService) {
  }

  ngOnInit(): void {
    this.userAuthenticated = JSON.parse(localStorage.getItem('APP-USER')) as UserModel;
    this.userSubscription = this.userService.userInformation.subscribe(user => this.userAuthenticated = user);
    this.getUsers(this.currentPage, this.itemsPerPage);
    this.uploadImageSubscription = this.modalUploadService.uploadNotificationEvent
      .subscribe(upload => {
        this.updateUserList();
        this.userService.notifyUserUpdated(upload.modelUpdated);
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.uploadImageSubscription.unsubscribe();
  }

  public onPageChange(event: number) {
    this.currentPage = event;
    if (this.searchText && this.searchText.trim().length > 0) {
      this.searchUsers(this.searchText, this.currentPage, this.itemsPerPage);
    } else {
      this.getUsers(this.currentPage, this.itemsPerPage);
    }
  }

  public onKeyUpSearchText() {
    this.updateUserList();
  }

  private updateUserList() {
    if (this.searchText && this.searchText.trim().length > 0) {
      this.searchUsers(this.searchText.trim(), 1, this.itemsPerPage);
    } else {
      this.getUsers(this.currentPage, this.itemsPerPage);
    }
  }

  private getUsers(page: number, limit: number) {
    this.loading = true;
    this.userService.find(page, limit).subscribe(
      paginator => {
        this.handlePaginator(paginator);
        this.loading = false
      },
      err => this.loading = false,
    );
  }

  private searchUsers(text: string, page: number, limit: number) {
    this.loading = true;
    this.userService.search(text, page, limit).subscribe(
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
    this.users = (paginator.docs as UserModel[]);
  }

  public handleDeleteUser(user: UserModel) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: `¿Are you sure to delete user ${user.name}?`,
      text: 'You will not be able to reverse this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Deleted!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.userService.delete(user._id).subscribe(
          resp => {
            this.toastr.success(`User ${user.name} has been successfully removed.`, 'Congratulations', {
              closeButton: true, progressAnimation: "decreasing", progressBar: true, timeOut: 3000
            });
            this.users = this.users.filter(u => u._id != user._id);
            this.totalItems--;
          },
          err => this.toastr.error(err.error.message, 'Delete user failed!', {closeButton: true, timeOut: 3000})
        );
      }
    });
  }

  public handleUpdateRole(user: UserModel) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: `¿Are you sure to change to rol ${user.role}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Updated!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.userService.updateRole(user._id, user.role).subscribe(
          userUpdated => {
            this.toastr.success(`User role has been successfully updated.`, 'Congratulations', {
              closeButton: true, timeOut: 3000
            });
            this.users = this.users.map( u => {
              if (u._id === userUpdated._id) u.role = userUpdated.role;
              return u;
            });
          },
          err => this.toastr.error(err.error.message, 'Update user role failed!', {closeButton: true, timeOut: 3000})
        );
      }
    });
  }

  public isThisUser(user: UserModel): boolean {
    return user._id === this.userAuthenticated._id;
  }

  public openUploadImageModal(user: UserModel): void {
    this.modalUploadService.openModal('user', user._id, user.name, user.image);
  }
}
