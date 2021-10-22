import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { loadProducts, selectProductAction } from 'src/app/store/actions/product/product.actions';
import { productsSelector } from 'src/app/store/selectors/product/product.selectors';
import { Product } from '../../../../../shared/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products$: Observable<Product[]>;
  selectedProduct : Product| null = null; // new

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) 
  { 
    this.products$ = this.store.select(productsSelector);
  }
    
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.store.dispatch(loadProducts({data: params.categories}))
    })
    
  }

  selectProduct(product: Product, selectedProduct: Product | null) {
    this.store.dispatch(selectProductAction(
      {data: this.isSelected(selectedProduct, product)? null: product}))
    return this.router.navigate(['/product/',product._id])
  }

  isSelected(selectedProduct: Product | null, product: Product){
    return selectedProduct?._id === product._id;
  }

  

}
