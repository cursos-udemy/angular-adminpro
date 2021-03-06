import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import Swal from 'sweetalert2'

import {UserSignUpModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public signupForm: FormGroup;
  public errorMessage: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
        name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
        confirmPassword: new FormControl(null, [Validators.required]),
        acceptTerms: new FormControl(false)
      }, {validators: this.passwordMatchValidator}
    );
  }

  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  protected passwordMatchValidator(group: FormGroup) {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    return (password && confirmPassword && password.value == confirmPassword.value) ? null : {'mismatch': true};
  }

  public handleSubmit(): void {
    this.errorMessage = null;
    if (this.signupForm.invalid) return;
    const userSignUp = this.signupForm.getRawValue() as UserSignUpModel;

    if (!userSignUp.acceptTerms) {
      Swal.fire('Important!', 'You must accept the terms and conditions to register!', 'warning');
      return;
    }
    this.userService.signUp(userSignUp)
      .subscribe(
        user => {
          Swal.fire(`Congratulations ${userSignUp.name}!`, 'Your account has been created correctly, you can now sign in the application!', 'success');
          this.router.navigateByUrl("/login");
        },
        err => {
          this.errorMessage = err.error.message;
          this.toastr.error(err.error.message, 'Signup failed!', {
            closeButton: true, timeOut: 5000
          });
        });
  }
}
