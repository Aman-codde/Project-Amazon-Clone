import { Injectable } from '@angular/core';
import { Order } from '../../../../shared/models/order.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private api: ApiService
  ) 
  { }

  getOrders() {
    return this.api.get<Order[]>('orders');
  }

  getOrdersByDate() {
    console.log('orders by date');
    return this.api.get<Order[]>('orders-by-date');
  }
}
