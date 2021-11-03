import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
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
    let value = "";
    if(this.cart?.count) {
      value =  this.cart.count <= 1 ? 'item': 'items';
    }
    return value;
  }

  goToOrder(cart: Cart) {
    this.router.navigate(['/order']);
  }
}
