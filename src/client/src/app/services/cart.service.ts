import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {Cart} from '../../../../shared/models/cart.model';
import { User } from '../../../../shared/models/user.model';
import { Product } from '../../../../shared/models/product.model';
import {Order} from '../../../../shared/models/order.model'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  constructor(
    private api: ApiService,
    private router: Router
    ) 
  { }

  getCart() {
    return this.api.get<Cart>('cart');
  }

  //add product to cart
  updateCart(product: Product, selected_qty: number) {
    return this.api.put<Cart,{product:Product,selected_qty:number}>('update-cart', {product,selected_qty})
  }

  // delete productId from cart
  deleteFromCart(product: Product) {
    return this.api.put<{data: Cart},Product>('delete-from-cart/'+product._id,product)
  }

  createOrder(cart: Cart) {
    return this.api.post<Order,Cart>('order',cart);
  }

  navigateOnUpdateCart() {
    return of(this.router.navigate(['/cart']));
  }

}
