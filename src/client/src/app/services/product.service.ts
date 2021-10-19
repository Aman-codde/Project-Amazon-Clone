import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Product } from '../../../../shared/models/product.model'

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
}
