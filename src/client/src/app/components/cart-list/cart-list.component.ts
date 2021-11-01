import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from '../../../../../shared/models/cart.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  cart$ : Observable<Cart>;
  cart: Cart | null = null;
  
  constructor(
    private apiService: ApiService,
    private cartService: CartService
    ) 
  { 
    this.cart$ = this.apiService.get<Cart>('cart')
  }

  ngOnInit(): void {
    this.cart$.subscribe(data => this.cart = data);
     
  }

  deleteProductFromCart(id: any) {
    console.log("product id to be deleted from cart = ",id);
    this.cartService.deleteFromCart(id);
  }

  totalCount() {
    if(this.cart?.count == 1)
      return 'item';
    else 
      return 'items';
  }
}
