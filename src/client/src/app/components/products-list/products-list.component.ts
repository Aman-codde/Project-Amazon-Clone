import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { AppState } from 'src/app/store';
import { loadProducts } from 'src/app/store/actions/product/product.actions';
import { productsSelector } from 'src/app/store/selectors/product/product.selectors';
import { Product } from '../../../../../shared/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) 
  { 
    this.products$ = this.store.select(productsSelector)
  }
    
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.store.dispatch(loadProducts({data: params.categories}))
    })
    
  }

  goToProduct(id: any) {
    //console.log('goToProduct',id)
    this.router.navigate(['/products/id'], {queryParams: {_id: id}})
    //return this.router.navigate(['/products',id])
  }

  /*getId(id: any) {
    console.log('getId',id)
    this.router.navigate(['/products'], {queryParams: {_id: id}})
  }*/

}
