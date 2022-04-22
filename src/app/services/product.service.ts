import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.httpClient.get("/api/v1/products").pipe(
      map((response) => response),
      catchError((e: any) => {
        return throwError(e);
      })
    );
  }

  getProducts() {
    return this.data;
  }

  data = [
    {
      id: 1,
      name: "One Plus",
      description: "This is good mobile",
      Price: 29000,
      imgaeUrl: "../../../assets/product.png",
    },
    {
      id: 2,
      name: "Lava",
      description: "This is good mobile ",
      Price: 14000,
      imgaeUrl: "../../../assets/product1.png",
    },
    {
      id: 3,
      name: "Samsung",
      description: "This is good mobile",
      Price: 13000,
      imgaeUrl: "../../../assets/product2.png",
    },
    {
      id: 4,
      name: "Lava",
      description: "This is good mobile ",
      Price: 500,
      imgaeUrl: "../../../assets/product.png",
    },
    {
      id: 5,
      name: "Java",
      description: "This is good mobile ",
      Price: 500,
      imgaeUrl: "../../../assets/product.png",
    },
    {
      id: 6,
      name: "Iphone",
      description: "This is good mobile ",
      Price: 500,
      imgaeUrl: "../../../assets/product.png",
    },
    {
      id: 7,
      name: "Oppo",
      description: "This is good mobile ",
      Price: 500,
      imgaeUrl: "../../../assets/product.png",
    },
    {
      id: 8,
      name: "Renoo",
      description: "This is good mobile ",
      Price: 500,
      imgaeUrl: "../../../assets/product.png",
    },
    {
      id: 9,
      name: "Mobile",
      description: "This is good mobile ",
      Price: 500,
      imgaeUrl: "../../../assets/product.png",
    },
    {
      id: 10,
      name: "iphone",
      description: "This is iphone mobile ",
      Price: 500,
      imgaeUrl: "../../../assets/product.png",
    },
    {
      id: 11,
      name: "Samsung",
      description: "Samsung is good mobile ",
      Price: 15000,
      imgaeUrl: "../../../assets/product1.png",
    },
    {
      id: 12,
      name: "Samsung",
      description: "This is good Samsung ",
      Price: 7000,
      imgaeUrl: "../../../assets/product2.png",
    },
  ];
}
