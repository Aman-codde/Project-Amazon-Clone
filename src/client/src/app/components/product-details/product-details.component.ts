import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { loadProducts } from 'src/app/store/actions/product/product.actions';
import { productsSelector } from 'src/app/store/selectors/product/product.selectors';
import { Product } from '../../../../../shared/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  selectedProduct$: Observable<Product[]>
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) 
  { 
    this.selectedProduct$ = this.store.select(productsSelector)
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.store.dispatch(loadProducts({data: params._id}))
    })

  }

}
