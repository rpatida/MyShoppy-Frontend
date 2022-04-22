import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessangerService } from "src/app/services/messanger.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor(private ms: MessangerService, private router: Router) {}
  isLoggedIn: boolean = false;
  count = 0;
  ngOnInit() {
    this.ms.getMessage().subscribe((data) => {
      this.count = data;
    });
    this.ms.getIsLoggedIn().subscribe((data) => {
      console.log(data);
      this.isLoggedIn = data;
      let username = JSON.parse(localStorage.getItem("username"));
      let product = JSON.parse(localStorage.getItem(username + "-product"));
      if (product) {
        this.count = product.quantity;
      }
    });

    let username = JSON.parse(localStorage.getItem("username"));
    if (username) {
      this.isLoggedIn = true;
      let product = JSON.parse(localStorage.getItem(username + "-product"));
      if (product) {
        this.count = product.quantity;
      }
    }
  }

  logout() {
    localStorage.removeItem("username");
    this.isLoggedIn = false;
    this.router.navigate(["/login"]);
  }
}
