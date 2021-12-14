import { Injectable } from '@angular/core';
import { Cart } from '../../../../shared/models/cart.model';
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

  createOrder(cart: Cart) {
    return this.api.post<Order,Cart>('create-order',cart);
  }
}
