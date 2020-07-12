import {Component, OnInit} from '@angular/core';
import {HttpEventType} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {FileUploadService} from "../../services/file-upload.service";
import {ToastrService} from "ngx-toastr";
import {ModalUploadService} from "./modal-upload.service";

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  public imageSelected: File;
  public imagePreview: string | ArrayBuffer;

  constructor(
    private userService: UserService,
    private fileUploadService: FileUploadService,
    private toastr: ToastrService,
    private modalUploadService: ModalUploadService) {
  }

  ngOnInit(): void {
    this.initialValues();
  }

  get modelName(): string{
    return this.modalUploadService.modelName;
  }

  get modelImage(): string {
    return this.modalUploadService.modelImage;
  }

  get modelType(): string {
    return this.modalUploadService.modelType;
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
  }

  public uploadImage() {
    if (!this.imageSelected) {
      this.initialValues();
      this.toastr.error('You must select an image', 'Update image failed!', {
        closeButton: true, timeOut: 3000
      });
    } else {
      this.fileUploadService.upload(this.imageSelected, this.modalUploadService.modelId, this.modalUploadService.modelType)
        .subscribe(event => {
            if (event.type === HttpEventType.Response) {
              this.modalUploadService.uploadNotificationEvent.emit(event.body);
              this.closeModal()
            }
          },
          err => {
            console.log(err);
            this.toastr.error(err.error.error, 'Update image failed!', {closeButton: true, timeOut: 3000});
          }
        )
    }
  }

  public closeModal(): void {
    this.initialValues();
    this.modalUploadService.closeModal();
  }

  public modalIsOpen(): boolean {
    return this.modalUploadService.isOpened();
  }

  private initialValues() {
    this.imageSelected = null;
    this.imagePreview = null;
  }
}
