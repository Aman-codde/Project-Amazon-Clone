import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { createOrder } from 'src/app/store/actions/order/order.actions';
import { updateUser } from 'src/app/store/actions/user/user.actions';
import { cartSelector } from 'src/app/store/selectors/cart/cart.selectors';
import { loggedUserSelector } from 'src/app/store/selectors/user/user.selectors';
import { Cart } from '../../../../../shared/models/cart.model';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  $cart: Observable<Cart | null>;
  $user: Observable<User | null>;
  createAddressForm: FormGroup
  hideOrderMsgDiv: boolean = true;
  showOrderDiv: boolean = true;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private fb: FormBuilder
  ) 
  { 
    this.$cart = this.store.select(cartSelector);

    this.$user = this.store.select(loggedUserSelector);

    this.createAddressForm= this.fb.group({
      fullName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      phone:['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      country: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  currentDate() {
     const d = new Date();
     return d.toLocaleDateString();
  }

  createAddress() {
    console.log("updateAddress: ",this.createAddressForm.value);
    this.store.dispatch(updateUser({data: {...this.createAddressForm.value}}))

  }

  placeOrder(cart: Cart) {
    this.store.dispatch(createOrder({data: cart}));
    this.showOrderDiv = false;
    this.hideOrderMsgDiv = false; 
  }

  navigateToOrders() {
    this.router.navigate(['/order-history']);
  }

}
