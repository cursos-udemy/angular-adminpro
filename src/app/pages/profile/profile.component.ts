import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {FileUploadService} from "../../services/file-upload.service";
import {HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit, OnDestroy {

  public user: UserModel;
  public imageSelected: File;
  public imagePreview: string | ArrayBuffer;
  public fileNameSelected: string;
  public uploadProgress: number;

  constructor(
    private userService: UserService,
    private fileUploadService: FileUploadService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('APP-USER')) as UserModel;
    //this.userService.userInformation.subscribe(user => this.user = user);
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
      err => {
        console.log(err);
        this.toastr.error('You profile could not be updated, please try again later', 'Update Profile failed!', {
          disableTimeOut: true, closeButton: true
        });
      }
    );
  }

  public selectImage(event): void {
    this.uploadProgress = 0;
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
            if (event.type === HttpEventType.UploadProgress) {
              this.uploadProgress = Math.round((event.loaded / event.total) * 100);
              console.log('uploadProgress', this.uploadProgress);
            } else if (event.type === HttpEventType.Response) {
              //this.modalService.uploadNotifier.emit(this.customer);
              let response: any = event.body;
              this.userService.updateImage(response.modelUpdated);
              this.user.image = response.modelUpdated.image;
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
              }
            )
          }
        )
    }
  }

  private initialValues(){
    this.imageSelected = null;
    this.fileNameSelected = "Select an image";
    //this.imagePreview = null;
    this.uploadProgress = 0;
  }

}
