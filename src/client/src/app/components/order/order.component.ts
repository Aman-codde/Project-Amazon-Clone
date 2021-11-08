import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { AppState } from 'src/app/store';
import { cartSelector } from 'src/app/store/selectors/cart/cart.selectors';
import { Cart } from '../../../../../shared/models/cart.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  $cart: Observable<Cart | null>;
  hideOrderMsgDiv: boolean = true;
  showOrderDiv: boolean = true;

  constructor(
    private store: Store<AppState>,
    private cartService: CartService
  ) 
  { 
    this.$cart = this.store.select(cartSelector);
  }

  ngOnInit(): void {
  }

  currentDate() {
     const d = new Date();
     return d.toLocaleDateString();
  }

  placeOrder(cart: Cart) {
    this.cartService.createOrder(cart).subscribe();
    this.showOrderDiv = false;
    this.hideOrderMsgDiv = false;
    
  }

}
