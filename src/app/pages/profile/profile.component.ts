import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public user: UserModel;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('APP-USER')) as UserModel;
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
        })
      }
    );
  }
}
