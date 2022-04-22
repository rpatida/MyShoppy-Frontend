import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgFlashMessageService } from "ng-flash-messages";
import { MessangerService } from "src/app/services/messanger.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private ngFlashMessageService: NgFlashMessageService,
    private router: Router,
    private ms: MessangerService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [""],
      password: [""],
    });
  }

  onLogin() {
    let { username, password } = this.loginForm.value;

    if (!username || !password) {
      this.ngFlashMessageService.showFlashMessage({
        messages: ["All fields are required"],
        dismissible: true,
        timeout: false,
        type: "danger",
      });

      return;
    }

    let logindata = {
      username,
      password,
    };

    this.userService.login(logindata).subscribe(
      (response) => {
        localStorage.setItem("username", JSON.stringify(username));
        this.ms.setIsLoggedIn(true);
        this.router.navigate(["/"]);
      },
      (error) => {
        console.log(error);
        this.showFlashMessages(error.error.message);
      }
    );
  }

  showFlashMessages(message) {
    this.ngFlashMessageService.showFlashMessage({
      messages: [message],
      dismissible: true,
      timeout: 2000,
      type: "danger",
    });
  }
}
