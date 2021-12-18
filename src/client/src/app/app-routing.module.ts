import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewCategoryComponent } from './components/add-new-category/add-new-category.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EditUserProfileComponent } from './components/edit-user-profile/edit-user-profile.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderComponent } from './components/order/order.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductInputComponent } from './components/product-input/product-input.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { PageUsersComponent } from './pages/page-users/page-users.component';

const routes: Routes = [
  {path: '',component: ProductsListComponent},
  {path: 'products', component: ProductsListComponent},
  {path: 'users', component: PageUsersComponent},
  {path: 'login', component: SignInComponent},
  {path:'add-product', component: ProductInputComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'cart', component: CartListComponent},
  {path: 'order', component: OrderComponent},
  {path: 'account', component:UserAccountComponent},
  {path: 'order-history', component: OrderHistoryComponent},
  {path: 'edit-profile', component: EditUserProfileComponent},
  {path: 'add-category', component: AddNewCategoryComponent},
  {path: 'update-products', component: UpdateProductComponent},
  {path: 'edit-product/:id', component: EditProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
