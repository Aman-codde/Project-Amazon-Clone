import { createAction, props } from '@ngrx/store';
import { Cart } from '../../../../../../shared/models/cart.model';
import { Order } from '../../../../../../shared/models/order.model';

export const loadOrders = createAction(
  '[Order] Load Orders'
);

export const loadOrdersSuccess = createAction(
  '[Order] Load Orders Success',
  props<{ data: Order[] }>()
);

export const loadOrdersFailure = createAction(
  '[Order] Load Orders Failure',
  props<{ error: Error }>()
);

export const createOrder = createAction(
  '[Order] Create Order',
  props<{data: Cart}>()
);

export const createOrderSuccess = createAction(
  '[Order] Create Order Success',
  props<{data: Order}>()
);

export const createOrderFailure = createAction(
  '[Oredr] Create Order Failure',
  props<{error: Error}>()
);

