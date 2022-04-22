import { Component, Input, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MessangerService } from "src/app/services/messanger.service";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  products: Object[];
  items = [];
  username;
  constructor(
    private toastr: ToastrService,
    private productService: ProductService,
    private ms: MessangerService
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.username = JSON.parse(localStorage.getItem("username"));
  }

  showSuccess(product) {
    this.toastr.success("Product added");
    this.addToCart(product);
  }

  addToCart(product) {
    let prodItems = JSON.parse(
      localStorage.getItem(this.username + "-product")
    );

    if (prodItems) {
      this.items = prodItems.item;
    }

    const index = this.items.findIndex((e) => e._id === product._id);

    if (index === -1) {
      product.quantity = 1;
      this.items.push(product);
    } else {
      this.items[index].quantity = this.items[index].quantity + 1;
    }

    //set total quantity
    let totalQuantity = 0;
    let totalPrice = 0;
    for (let i in this.items) {
      totalQuantity = totalQuantity + this.items[i].quantity;
      totalPrice = totalPrice + this.items[i].price * this.items[i].quantity;
    }

    let products = {
      item: this.items,
      quantity: totalQuantity,
      price: totalPrice,
    };

    localStorage.setItem(this.username + "-product", JSON.stringify(products));
    this.ms.sendMessage(totalQuantity);
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (response) => {
        this.products = response.product;
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }
}
