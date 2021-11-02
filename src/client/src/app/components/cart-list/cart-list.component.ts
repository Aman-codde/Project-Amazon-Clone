import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { deleteProductFromCart, loadCart } from 'src/app/store/actions/cart/cart.actions';
import { cartSelector } from 'src/app/store/selectors/cart/cart.selectors';
import { Cart } from '../../../../../shared/models/cart.model';
import { Product } from '../../../../../shared/models/product.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  cart$ : Observable<Cart | null>;
  cart: Cart | null = null;
  
  constructor(
    private store: Store<AppState>,
    ) 
  { 
    this.cart$ = this.store.select(cartSelector)
  }

  ngOnInit(): void {
    this.store.dispatch(loadCart());
    this.cart$.subscribe(data => this.cart = data);
  }

  deleteProductFromCart(product: Product) {
    this.store.dispatch(deleteProductFromCart({data: product}));
  }

  totalCount() {
    if(this.cart?.count == 1 || this.cart?.count == 0)
      return 'item';
    else 
      return 'items';
  }
}
