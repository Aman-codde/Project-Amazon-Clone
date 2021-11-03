import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {Cart} from '../../../../shared/models/cart.model';
import { User } from '../../../../shared/models/user.model';
import { Product } from '../../../../shared/models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  constructor(private api: ApiService) 
  { }

  getCart() {
    return this.api.get<Cart>('cart');
  }

  //add product to cart
  updateCart(product: Product) {
    return this.api.put<Cart,Product>('update-cart', product)
  }

  // delete productId from cart
  deleteFromCart(product: Product) {
    return this.api.put<{data: Cart},Product>('delete-from-cart/'+product._id,product)
  }

}
