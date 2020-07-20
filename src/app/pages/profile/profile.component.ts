import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {HttpEventType} from "@angular/common/http";

import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {FileUploadService} from "../../services/file-upload.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit, OnDestroy {

  public imageSelected: File;
  public imagePreview: string | ArrayBuffer;
  public fileNameSelected: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fileUploadService: FileUploadService,
    private toastr: ToastrService
  ) {
  }

  public get user (): UserModel {
    return this.authService.userAuthenticated;
  }
  ngOnInit(): void {
    this.initialValues();
  }

  ngOnDestroy() {
    this.imageSelected = null
    this.imagePreview = null;
  }

  public handleSubmit(form: NgForm): void {
    if (form.invalid) return;
    const userToUpdate = form.value as UserModel;
    this.userService.updateProfile(this.user._id, userToUpdate).subscribe(
      profileUpdated => {
        this.toastr.success(`your profile has been successfully updated`, null, {
          closeButton: true, progressAnimation: "decreasing", progressBar: true, timeOut: 3000
        });
      },
      err => this.toastr.error(err.error.message, 'Update Profile failed!', {
        disableTimeOut: true, closeButton: true
      })
    );
  }

  public selectImage(event): void {
    this.imageSelected = event.target.files[0];
    if (!this.imageSelected) {
      this.initialValues();
      return;
    }

    if (this.imageSelected.type.indexOf('image') < 0) {
      this.toastr.error('The file must be of the image type', 'Update image failed!', {
        closeButton: true, timeOut: 3000
      });
      this.initialValues();
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.imageSelected);
    reader.onloadend = () => this.imagePreview = reader.result;
    this.fileNameSelected = this.imageSelected.name;
  }

  public uploadImage() {
    if (!this.imageSelected) {
      this.initialValues();
      this.toastr.error('You must select an image', 'Update image failed!', {
        closeButton: true, timeOut: 3000
      });
    } else {
      this.fileUploadService.upload(this.imageSelected, this.user._id, 'user')
        .subscribe(event => {
             if (event.type === HttpEventType.Response) {
              let response: any = event.body;
              this.authService.notifyUserUpdated(response.modelUpdated);
              this.initialValues();
              this.toastr.success(`Your image has been successfully updated`, 'Congratulations', {
                closeButton: true, progressAnimation: "decreasing", progressBar: true, timeOut: 3000
              });
            }
          },
          err => {
            console.log(err);
            this.toastr.error(err.error.error, 'Update image failed!', {
              closeButton: true, timeOut: 3000
            });
          }
        )
    }
  }

  private initialValues() {
    this.imageSelected = null;
    this.fileNameSelected = "Select an image";
  }
}
