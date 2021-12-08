import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { updateCart } from 'src/app/store/actions/cart/cart.actions';
import { loadProduct} from 'src/app/store/actions/product/product.actions';
import { productSelector, selectedProductSelector } from 'src/app/store/selectors/product/product.selectors';
import { loggedUserSelector } from 'src/app/store/selectors/user/user.selectors';
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
  selectedProduct : Product| null = null; 
  loggedUser : User | null = null

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) 
  { 
    this.product$ = this.store.select(productSelector)
    this.selectedProduct$ = this.store.select(selectedProductSelector);
    this.store.select(loggedUserSelector).subscribe(data => this.loggedUser = data);
  }

  ngOnInit(): void {

    this.selectedProduct$.subscribe(data => this.selectedProduct = data);
    const id = "" + this.selectedProduct?._id 
    this.store.dispatch(loadProduct({data: id}))

  }

  checkQuantity(){
    if(this.selectedProduct?.quantity == 0)
      return false;
    else
      return true;
  }

  addToCart() {
    const product = this.selectedProduct!;
    const default_qty = 1;
    if(this.loggedUser) {
      this.store.dispatch(updateCart({ data: product, selected_qty: default_qty} ));
    }
    else {
      this.router.navigate(['/login']);
    }
    
  }
  
  goToOrder() {
    //return this.router.navigate(['/order']);
    if(!this.loggedUser) {
      this.router.navigate(['/login']);
    }
  }
}
