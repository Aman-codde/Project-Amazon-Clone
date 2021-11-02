import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { deleteProductFromCart, deleteProductFromCartFailure, deleteProductFromCartSuccess, loadCart, loadCartFailure, loadCartSuccess, updateCart, updateCartFailure, updateCartSuccess } from '../../actions/cart/cart.actions';



@Injectable()
export class CartEffects {

  loadCart$ = createEffect( () => 
    this.actions$
    .pipe(
      ofType(loadCart),
      mergeMap(() => this.cartService.getCart()
      .pipe(
        map( data => loadCartSuccess({data})),
        catchError(err => of(loadCartFailure({error: err})))
      ))
    )
  )

  updateCart$ = createEffect( () => 
    this.actions$
    .pipe(
      ofType(updateCart),
      mergeMap((action) => 
        this.cartService.updateCart(action.data)
        .pipe(
          map(data => updateCartSuccess({data})),
          catchError((err) => of(updateCartFailure({error: err})))
        ))
      )
  )

  deleteProductFromCart$ = createEffect(() => 
    this.actions$
    .pipe(
      ofType(deleteProductFromCart),
      mergeMap((action) => 
      this.cartService.deleteFromCart(action.data)
      .pipe(
        map(data => deleteProductFromCartSuccess({data})),
        catchError(err => of(deleteProductFromCartFailure({error: err})))
      ))
    )
  )

  constructor(
    private actions$: Actions,
    private cartService: CartService
    ) {}
}
