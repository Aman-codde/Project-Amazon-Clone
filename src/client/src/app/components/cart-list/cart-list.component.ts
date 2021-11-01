import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from '../../../../../shared/models/cart.model';
import { Product } from '../../../../../shared/models/product.model';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  cart$ : Observable<Cart>;
  
  
  //product$!: Observable<Product>
  constructor(
    private apiService: ApiService,
    private cartService: CartService
    ) 
  { 
    this.cart$ = this.apiService.get<Cart>('cart')//.pipe(map(cart => ({user:cart.user as User, products: cart.products as Product[]})))
  }

  ngOnInit(): void {
     
  }

  deleteProductFromCart(id: any) {
    console.log("product id to be deleted from cart = ",id);
    this.cartService.deleteFromCart(id);
  }
}
