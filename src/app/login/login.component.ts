import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {UserSignInModel} from "../models/user.model";
import {UserService} from "../services/user.service";
import {ToastrService} from "ngx-toastr";

declare function initPlugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public rememberMe: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    initPlugins();
    const emailRemembered = localStorage.getItem('APP-REMEMBER-ME');
    if (emailRemembered) {
      this.rememberMe = true;
      this.email =emailRemembered;
    }
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
      loginSuccess => {
        localStorage.setItem('APP-USER-ID', loginSuccess.userId);
        //localStorage.setItem('APP-USER-NAME', loginSuccess.name);
        localStorage.setItem('APP-TOKEN', loginSuccess.accessToken);
        this.toastr.success(`Welcome ${loginSuccess.name}`, 'Login success!', {
          closeButton: true, progressAnimation: "decreasing", progressBar: true, timeOut: 10000
        });
        this.router.navigateByUrl("/dashboard");
      },
      err => {
        this.toastr.error('Invalid credentials', 'Login failed!', {
          disableTimeOut: true, closeButton: true
        });
      }
    );

    //this.router.navigateByUrl("/dashboard");

  }
}
