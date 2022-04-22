import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./services/user.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    var isAuthenticated = this.userService.getAuthStatus();
    if (!isAuthenticated) {
      this.router.navigate(["/login"]);
      return false;
    }
    if (isAuthenticated && state.url == "/login") {
      //this.router.navigate(["/"]);
    }

    console.log(route, state);

    return isAuthenticated;
  }
}
