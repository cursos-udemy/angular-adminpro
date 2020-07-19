import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {UserModel, UserSignInModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";

declare const gapi: any;
const HOME_PAGE = "/dashboard";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  private auth2: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private fb: FormBuilder,
    private toastr: ToastrService) {

    const emailRemembered = localStorage.getItem('APP-REMEMBER-ME');
    this.loginForm = this.fb.group({
      email: [emailRemembered || '', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rememberMe: [!!(emailRemembered)]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.renderGoogleButton();
  }

  public renderGoogleButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }

  async startApp() {
    await this.authService.googleInit();
    this.auth2 = this.authService.auth2;
    this.attachSignin();
  };

  protected attachSignin() {
    let element = document.getElementById('my-signin2');
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      const token = googleUser.getAuthResponse().id_token;
      let u: UserModel = null;
      this.authService.signInGoogle(token).subscribe(
        loginSuccess => {
          this.handlerLoginSuccess(loginSuccess);
          this.ngZone.run(() => this.router.navigateByUrl(HOME_PAGE));
        },
        err => {
          console.warn(err);
          this.toastr.error(err, 'Login with google failed!', {
            disableTimeOut: true, closeButton: true
          });
        });
    });
  }

  public handleSubmit(): void {
    if (this.loginForm.invalid) return;
    const userSignIn = this.loginForm.value as UserSignInModel;
    this.authService.signIn(userSignIn).subscribe(
      loginSuccess => {
        this.router.navigateByUrl(HOME_PAGE);
        this.handlerLoginSuccess(loginSuccess);
      },
      err => {
        this.toastr.error('Invalid credentials', 'Login failed!', {
          disableTimeOut: true, closeButton: true
        });
      });
    if (userSignIn.rememberMe) {
      localStorage.setItem('APP-REMEMBER-ME', userSignIn.email);
    } else {
      localStorage.removeItem('APP-REMEMBER-ME');
    }
  }

  private handlerLoginSuccess(userAuthenticated) {
    this.toastr.success(`Welcome ${userAuthenticated.user.name}`, 'Login success!', {
      closeButton: true, progressAnimation: "decreasing", progressBar: true, timeOut: 5000
    });
  }
}
