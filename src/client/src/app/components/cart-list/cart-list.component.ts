import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store';
import { deleteProductFromCart, loadCart, updateCart } from 'src/app/store/actions/cart/cart.actions';
import { cartSelector } from 'src/app/store/selectors/cart/cart.selectors';
import { loggedUserSelector } from 'src/app/store/selectors/user/user.selectors';
import { Cart } from '../../../../../shared/models/cart.model';
import { Product } from '../../../../../shared/models/product.model';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  cart$ : Observable<Cart | null>;
  cart: Cart | null = null;
  loggedInUser$! : Observable<User | null>;
  checkLogin$! : Observable<User | null>;
  
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthService
    ) 
  { 
    this.cart$ = this.store.select(cartSelector);
    this.loggedInUser$ = this.store.select(loggedUserSelector);
    this.checkLogin$ = this.authService.checkLogin();
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

  createQtyArray(q: any) {
    let qArr = [];
    for (let i = 1; i<=q; i++) {
      qArr.push(i);
    }
    //const qArr = Array.from({length: q}, (_, index) => index + 1)
    return qArr;[1,2,3,4,5]
  }

  changeQty (p: Product,e:any) {
    this.store.dispatch(updateCart({data: p, selected_qty: e.target.value}))
    console.log(e.target.value);
  }

  cartTitle() {
    if(this.cart?.count != 0)
      return "Shopping Cart: " + this.cart?.user?.firstName;
      //style({color: "green"})
    else
      return "Your Cart is empty."
  }

  // getTotalAmount() {
  //   let total = 0;
  //   total = this.cart?.total_amount
  //   return Math.round(total);
  // }

}
