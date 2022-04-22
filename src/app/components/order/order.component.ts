import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit {
  orderList = [];
  isOrderdetail: Boolean = false;
  orderDetailList = [];
  orderdetailNo;
  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getAllOrders().subscribe(
      (response) => {
        this.orderList = response.order;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  showOrderDetails(orderdetail) {
    console.log("order detail", orderdetail);
    this.orderDetailList = orderdetail.orderItems;
    this.isOrderdetail = true;
    this.orderdetailNo = orderdetail._id;
  }
  hideOrderDetail() {
    this.isOrderdetail = false;
  }
}
