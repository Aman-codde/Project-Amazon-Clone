import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Product } from '../../../../shared/models/product.model'
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private api: ApiService) 
  { }

  postProduct(product: Product) {
    console.log("product service data: ", product);
    //return this.api.post<Product[],Product>('create-product',product);
    return this.api.post<{data: Product},Product>('create-product',product);
  }

  getProducts(categories: string) {
    return this.api.post<{data:Product[]},{categories: string}>('products',{categories}).pipe(tap(d => console.log("product list: ",d)));
  }

  /*getProducts(params: string) {
    return this.api.post<{data:Product[]},{_id: string}>('products',{_id: params});
  }*/

  /*getProduct(params: string) {
    return this.api.post<{data:Product[]},{_id: string}>('products',{_id: params});
  }*/

}
