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
  selectedUserId = '';

  constructor(private api: ApiService) 
  { }

  //postCart(create cart )

  //updateCart
  updateCart(product: Product) {
    console.log("update cart() is called in cart services");
    //console.log(user,product);
    return this.api.put<User,Product>('update-cart', product)
  }

  // delete productId from cart
  deleteFromCart(productId: any) {
    console.log("delete cart() is called in cart services");
    console.log(productId);
    return this.api.delete<Product>('delete-from-cart/'+productId).subscribe();
  }

  selectUser(id: string) {
    this.selectedUserId = id;  
  }

}
