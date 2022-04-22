import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  createUser(data): Observable<any> {
    return this.httpClient.post("/api/v1/user/new", data).pipe(
      map((response) => response),
      catchError((e: any) => {
        return throwError(e);
      })
    );
  }
  getUsers(): Observable<any> {
    return this.httpClient.get("/api/v1/users");
  }

  login(data): Observable<any> {
    return this.httpClient.post("/api/v1/login", data).pipe(
      map((response) => response),
      catchError((e: any) => {
        return throwError(e);
      })
    );
  }

  getAuthStatus() {
    let username = JSON.parse(localStorage.getItem("username"));
    if (username) {
      return true;
    } else {
      return false;
    }
  }
}
