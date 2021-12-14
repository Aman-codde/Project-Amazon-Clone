import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { AppState } from 'src/app/store';
import { createOrder } from 'src/app/store/actions/order/order.actions';
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
    private orderService: OrderService,
    private router: Router
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
    //this.orderService.createOrder(cart).subscribe();
    this.store.dispatch(createOrder({data: cart}));
    this.showOrderDiv = false;
    this.hideOrderMsgDiv = false; 
  }

  navigateToOrders() {
    this.router.navigate(['/order-history']);
  }

}
