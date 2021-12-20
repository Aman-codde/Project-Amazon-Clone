import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { createProduct, createProductFailure, createProductSuccess, loadProduct,loadProductSuccess, loadProductFailure, loadProducts, loadProductsFailure, loadProductsSuccess, updateProduct, updateProductSuccess, updateProductFailure } from '../../actions/product/product.actions';

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

  loadProducts$ = createEffect(() => 
      this.actions$
      .pipe(
        ofType(loadProducts),
        mergeMap((action) => 
        this.productService.getProducts(action.data)
        .pipe(
          map(data => (loadProductsSuccess(data)),
          catchError((err) => of(loadProductsFailure(err)))
        ))
        )
      )
  );

  //for one product
  loadProduct$ = createEffect(() => 
    this.actions$
    .pipe(
      ofType(loadProduct),
      mergeMap((action) => this.productService.getProduct(action.data)
      .pipe(
        map(data => loadProductSuccess(data)),
        catchError(err => of(loadProductFailure({error: err})))
      )
      )
    )
  )

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      mergeMap((action) =>
        this.productService.updateProduct(action.data,action.p).pipe(
          tap(data => console.log("updated Product:",data)),
          map((data) => updateProductSuccess(data)),
          catchError((error) => of(updateProductFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  )  {}

}
