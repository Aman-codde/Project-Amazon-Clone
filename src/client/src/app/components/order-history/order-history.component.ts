import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { loadOrders } from 'src/app/store/actions/order/order.actions';
import { ordersSelector } from 'src/app/store/selectors/order/order.selectors';
import { Order } from '../../../../../shared/models/order.model';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders$!: Observable<Order[]> 
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) 
  { 
    this.store.dispatch(loadOrders())
    this.orders$ = this.store.select(ordersSelector)
  }

  ngOnInit(): void {
  }

  backToAccount() {
    this.router.navigate(['/account']);
  }

  getDateFormat( dateString: any) {
    return new Date(dateString).toLocaleDateString()
  }

}
