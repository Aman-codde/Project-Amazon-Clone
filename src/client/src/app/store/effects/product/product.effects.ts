import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { createProduct, createProductFailure, createProductSuccess } from '../../actions/product/product.actions';



@Injectable()
export class ProductEffects {

  createProduct$ = createEffect(() => 
    this.actions$
    .pipe(
      ofType(createProduct),
      mergeMap( (action) => 
      this.productService.postProduct(action.data).pipe(
        tap(d => console.log("effects data: ",d)),
        map((data) => createProductSuccess(data)),
        catchError((err) => of(createProductFailure({error: err})))
      ) )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  )  {}

}
