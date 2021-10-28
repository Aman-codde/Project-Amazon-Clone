import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Cart } from '../../../../../shared/models/cart.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  cart$ : Observable<Cart[]>
  constructor(private apiService: ApiService) 
  { 
    this.cart$ = this.apiService.get<Cart[]>('cart')
  }

  ngOnInit(): void {
     
  }
  deleteFromCart(id: any) {
    console.log("product id to be deleted from cart = ",id);
  }
}
