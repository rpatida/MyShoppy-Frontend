import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  createOrder(data): Observable<any> {
    return this.httpClient.post("/api/v1/order/new", data).pipe(
      map((response) => response),
      catchError((e: any) => {
        return throwError(e);
      })
    );
  }

  getAllOrders(): Observable<any> {
    return this.httpClient.get("/api/v1/orders").pipe(
      map((response) => response),
      catchError((e: any) => {
        return throwError(e);
      })
    );
  }
}
