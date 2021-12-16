import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { productsSelector } from 'src/app/store/selectors/product/product.selectors';
import { Product } from '../../../../../shared/models/product.model';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  products$: Observable<Product[]>;
  constructor(
    private store:Store<AppState>,
    private router: Router
  ) 
  {
    this.products$ = this.store.select(productsSelector);  
  }

  ngOnInit(): void {
  }

  editProduct(product: Product) {
    
  }

}
