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
  updateCart(userId: string, product: Product) {
    console.log("update cart() is called in cart services");
    console.log(userId,product);
    return this.api.put<User,Product>('update-cart/' + userId, product)
  }

  // delete productId from cart

  selectUser(id: string) {
    this.selectedUserId = id;  
  }

}
