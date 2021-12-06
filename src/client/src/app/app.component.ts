import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart } from '../../../shared/models/cart.model';
import { User } from '../../../shared/models/user.model';
import { AuthService } from './services/auth.service';
import { AppState } from './store';
import { logoutUser } from './store/actions/user/user.actions';
import { cartSelector } from './store/selectors/cart/cart.selectors';
import { loggedUserSelector } from './store/selectors/user/user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'client';
  loggedUser$! : Observable<User | null>
  cart$!: Observable<Cart | null>
  cart: Cart | null = null;

  constructor(
    private store: Store<AppState>
  ) 
  {          
    this.loggedUser$ = this.store.select(loggedUserSelector);
    this.cart$ = this.store.select(cartSelector);
  }

  ngOnInit(): void {
    this.cart$.subscribe(data => this.cart = data);
  }

  logout() {
    this.store.dispatch(logoutUser());
  }
}
