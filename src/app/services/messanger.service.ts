import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MessangerService {
  constructor() {}

  private subject = new Subject<any>();
  private loggedInSubject = new Subject<any>();

  sendMessage(mssg) {
    this.subject.next(mssg);
  }

  getMessage() {
    return this.subject.asObservable();
  }

  setIsLoggedIn(isLoggedIn: boolean) {
    this.loggedInSubject.next(isLoggedIn);
  }

  getIsLoggedIn() {
    return this.loggedInSubject.asObservable();
  }
}
