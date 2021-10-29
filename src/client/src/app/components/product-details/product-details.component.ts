import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { AppState } from 'src/app/store';
import { loadProduct} from 'src/app/store/actions/product/product.actions';
import { productSelector, selectedProductSelector } from 'src/app/store/selectors/product/product.selectors';
import { Product } from '../../../../../shared/models/product.model';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<Product | null>;
  selectedProduct$: Observable<Product | null>
  selectedProduct : Product| null = null; // new
  //temporary
  //selectedUser: Observable<User | null>; 

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private cartService: CartService
  ) 
  { 
    this.product$ = this.store.select(productSelector)
    this.selectedProduct$ = this.store.select(selectedProductSelector);
  }

  ngOnInit(): void {

    this.selectedProduct$.subscribe(data => this.selectedProduct = data);
    const id = ""+this.selectedProduct?._id
    this.store.dispatch(loadProduct({data: id}))

  }

  checkQuantity(){
    if(this.selectedProduct?.quantity == 0)
      return false;
    else
      return true;
  }

  addToCart() {
    // if new user(if userid not found in  the cart collection)
      // 1.create cart and 2.add product to cart

    // if existing user(if userid found in  the cart collection)
      // 2. pass userid and add product to card
    //this.cartService.selectUser("615ee77596fadd70d45456a2");
    //const userId = "615ee77596fadd70d45456a2";
    const product = this.selectedProduct!;
    this.cartService.updateCart(product).subscribe();
  }
  
}
