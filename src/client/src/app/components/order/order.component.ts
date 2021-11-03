import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Cart } from '../../../../../shared/models/cart.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  //$cart: Cart;
  constructor(
    private store: Store<AppState>
  ) 
  { 

  }

  ngOnInit(): void {
  }

}
