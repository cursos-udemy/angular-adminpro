import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserSignUpModel} from "../models/user.model";

declare function initPlugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  public signupForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    initPlugins();
    this.signupForm = new FormGroup({
        name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
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
    if (this.signupForm.invalid) return;

    const userSignUp = this.signupForm.getRawValue() as UserSignUpModel;
    console.log(userSignUp);

    if (!userSignUp.acceptTerms) {
      console.log('you must accept the terms and conditions to register');
      return;
    }
  }
}
