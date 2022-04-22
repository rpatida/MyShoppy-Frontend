import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { NgFlashMessageService } from "ng-flash-messages";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent implements OnInit {
  userRegistrationForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private ngFlashMessageService: NgFlashMessageService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userRegistrationForm = this.fb.group({
      name: [""],
      username: [""],
      password: [""],
      address: [""],
    });
  }

  onSave() {
    let { name, username, password, address } = this.userRegistrationForm.value;

    if (!name || !username || !password || !address) {
      this.ngFlashMessageService.showFlashMessage({
        messages: ["All fields are required"],
        dismissible: true,
        timeout: false,
        type: "danger",
      });
    } else {
      this.userService.createUser(this.userRegistrationForm.value).subscribe(
        (response) => {
          this.toastr.success("User added successfully");
          this.router.navigate(["/login"]);
        },
        (error) => {
          this.showFlashMessages(error.error.message);
        }
      );
    }
  }

  showFlashMessages(message) {
    this.ngFlashMessageService.showFlashMessage({
      messages: [message],
      dismissible: true,
      timeout: 2000,
      type: "danger",
    });
  }

  getAllUser() {
    this.userService.getUsers().subscribe((users) => {});
  }
}
