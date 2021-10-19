import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductInputComponent } from './components/product-input/product-input.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { PageUsersComponent } from './pages/page-users/page-users.component';

const routes: Routes = [
  {path: '',component: ProductsListComponent},
  {path: 'users', component: PageUsersComponent},
  {path:'add-product', component: ProductInputComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
