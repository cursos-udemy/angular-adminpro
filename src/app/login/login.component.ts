import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {UserSignInModel} from "../models/user.model";
import {UserService} from "../services/user.service";
import {ToastrService} from "ngx-toastr";

declare function initPlugins();

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public rememberMe: boolean = false;
  private auth2: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    initPlugins();

    this.googleInit();
    const emailRemembered = localStorage.getItem('APP-REMEMBER-ME');
    if (emailRemembered) {
      this.rememberMe = true;
      this.email = emailRemembered;
    }
  }

  protected googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '220412093307-obj46sqtus2450vgconvm460ieticfgo.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin();
    });
  }

  protected attachSignin() {
    let element = document.getElementById('button-google');
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      const token = googleUser.getAuthResponse().id_token;
      this.userService.signInGoogle(token).subscribe(
        loginSuccess => this.handlerLoginSuccess(loginSuccess),
        err => {
          console.warn(err);
          this.toastr.error(err, 'Login failed!', {
            disableTimeOut: true, closeButton: true
          });
        });
    });
  }

  public handleSubmit(form: NgForm): void {

    if (form.invalid) return;

    const userSignIn = form.value as UserSignInModel;
    if (userSignIn.rememberMe) {
      localStorage.setItem('APP-REMEMBER-ME', userSignIn.email);
    } else {
      localStorage.removeItem('APP-REMEMBER-ME');
    }

    this.userService.signIn(userSignIn).subscribe(
      loginSuccess => this.handlerLoginSuccess(loginSuccess),
      err => {
        this.toastr.error('Invalid credentials', 'Login failed!', {
          disableTimeOut: true, closeButton: true
        });
      });
  }

  private handlerLoginSuccess(userAuthenticated) {
    this.toastr.success(`Welcome ${userAuthenticated.name}`, 'Login success!', {
      closeButton: true, progressAnimation: "decreasing", progressBar: true, timeOut: 5000
    });
    this.router.navigateByUrl("/dashboard");
  }
}
