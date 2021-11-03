import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { OrderComponent } from './components/order/order.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductInputComponent } from './components/product-input/product-input.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { PageUsersComponent } from './pages/page-users/page-users.component';

const routes: Routes = [
  {path: '',component: ProductsListComponent},
  {path: 'products', component: ProductsListComponent},
  {path: 'users', component: PageUsersComponent},
  {path: 'login', component: SignInComponent},
  {path:'add-product', component: ProductInputComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'cart', component: CartListComponent},
  {path: 'order', component: OrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
