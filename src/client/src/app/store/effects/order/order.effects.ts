import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { loadOrders, loadOrdersFailure, loadOrdersSuccess } from '../../actions/order/order.actions';



@Injectable()
export class OrderEffects {
  loadOrders$ = createEffect(() => 
    this.actions$.pipe(
      ofType(loadOrders),
      mergeMap(() => this.orderService.getOrders().pipe(
        tap(data =>console.log("orders:",data)),
        map((data) => loadOrdersSuccess({data})),
        catchError(err => of(loadOrdersFailure(err)))
      ))
    )
  )


  constructor(
    private actions$: Actions, 
    private orderService: OrderService
  ) 
  {}

}
