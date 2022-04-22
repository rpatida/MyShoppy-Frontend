import { ConstantPool } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { Router, Routes } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { MessangerService } from "src/app/services/messanger.service";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  constructor(
    private router: Router,
    private ms: MessangerService,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}
  isCount: boolean = false;
  totalProduct = [];
  totalPrice = 0;
  Quantity = 0;
  username;
  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem("username"));
    let count = JSON.parse(localStorage.getItem(this.username + "-product"));
    if (count && count.item.length > 0) {
      this.isCount = true;
      this.totalProduct = count.item;
      this.totalPrice = count.price;
      this.Quantity = count.quantity;
    }
  }

  increaseProduct(productId) {
    let product = JSON.parse(localStorage.getItem(this.username + "-product"));
    let items = product.item;

    const index = items.findIndex((e) => e._id === productId);

    items[index].quantity = items[index].quantity + 1;

    //set total quantity
    let totalQuantity = 0;
    let totalPrice = 0;
    for (let i in items) {
      totalQuantity = totalQuantity + items[i].quantity;
      totalPrice = totalPrice + items[i].price * items[i].quantity;
    }

    let products = {
      item: items,
      quantity: totalQuantity,
      price: totalPrice,
    };
    localStorage.setItem(this.username + "-product", JSON.stringify(products));
    this.ms.sendMessage(totalQuantity);
    this.totalProduct = items;
    this.totalPrice = totalPrice;
    this.Quantity = totalQuantity;
  }

  decreaseProduct(productId) {
    let product = JSON.parse(localStorage.getItem(this.username + "-product"));
    let items = product.item;

    const index = items.findIndex((e) => e._id === productId);

    if (items[index].quantity > 1) {
      items[index].quantity = items[index].quantity - 1;

      //set total quantity
      let totalQuantity = 0;
      let totalPrice = 0;
      for (let i in items) {
        totalQuantity = totalQuantity + items[i].quantity;
        totalPrice = totalPrice + items[i].price * items[i].quantity;
      }

      let products = {
        item: items,
        quantity: totalQuantity,
        price: totalPrice,
      };

      localStorage.setItem(
        this.username + "-product",
        JSON.stringify(products)
      );
      this.ms.sendMessage(totalQuantity);
      this.totalProduct = items;
      this.totalPrice = totalPrice;
      this.Quantity = totalQuantity;
    } else {
      let remainingItems = items.filter((item) => item._id !== productId);

      //set total quantity
      let rTotalQuantity = 0;
      let rTotalPrice = 0;
      for (let i in remainingItems) {
        rTotalQuantity = rTotalQuantity + remainingItems[i].quantity;
        rTotalPrice =
          rTotalPrice + remainingItems[i].price * remainingItems[i].quantity;
      }

      let products = {
        item: remainingItems,
        quantity: rTotalQuantity,
        price: rTotalPrice,
      };

      localStorage.setItem(
        this.username + "-product",
        JSON.stringify(products)
      );
      this.ms.sendMessage(rTotalQuantity);
      this.totalProduct = remainingItems;
      this.totalPrice = rTotalPrice;
      this.Quantity = rTotalQuantity;

      if (remainingItems.length == 0) {
        this.isCount = false;
      }
    }
  }

  removeItem(productId) {
    let product = JSON.parse(localStorage.getItem(this.username + "-product"));
    let items = product.item;

    let remainingItems = items.filter((item) => item._id !== productId);

    //set total quantity
    let rTotalQuantity = 0;
    let rTotalPrice = 0;
    for (let i in remainingItems) {
      rTotalQuantity = rTotalQuantity + remainingItems[i].quantity;
      rTotalPrice =
        rTotalPrice + remainingItems[i].price * remainingItems[i].quantity;
    }

    let products = {
      item: remainingItems,
      quantity: rTotalQuantity,
      price: rTotalPrice,
    };

    localStorage.setItem(this.username + "-product", JSON.stringify(products));
    this.ms.sendMessage(rTotalQuantity);
    this.totalProduct = remainingItems;
    this.totalPrice = rTotalPrice;
    this.Quantity = rTotalQuantity;

    if (remainingItems.length == 0) {
      this.isCount = false;
    }
  }

  onShopNow() {
    this.router.navigate(["/"]);
  }

  placedOrder() {
    let product = JSON.parse(localStorage.getItem(this.username + "-product"));
    let items = product.item;
    let orderItems = [];

    for (let i in items) {
      orderItems.push({
        name: items[i].name,
        description: items[i].description,
        quantity: items[i].quantity,
        imageUrl: items[i].imageUrl,
        price: items[i].price,
        product: items[i]._id,
      });
    }

    let data = {
      orderItems,
      shippingInfo: {
        address: "Keshav Nagar Mundwa Pune",
        city: "Pune",
        postalCode: "411036",
      },
      totalPrice: product.price,
      totalQuantity: product.quantity,
      user: "62015b6369670cb093f3d121",
    };

    this.orderService.createOrder(data).subscribe(
      (response) => {
        if (response.success) {
          this.toastr.success("Your Order placed successfully");
          localStorage.removeItem(this.username + "-product");
          this.ms.sendMessage(0);
          this.isCount = false;
        }
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }
}
