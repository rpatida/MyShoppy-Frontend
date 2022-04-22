import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CartComponent } from "./components/cart/cart.component";
import { LoginComponent } from "./components/login/login.component";
import { OrderComponent } from "./components/order/order.component";
import { ProductsComponent } from "./components/products/products.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "cart",
    component: CartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    component: LoginComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: "registration",
    component: RegistrationComponent,
  },
  {
    path: "order",
    component: OrderComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
