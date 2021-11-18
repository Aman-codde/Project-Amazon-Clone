import { createAction, props } from '@ngrx/store';
import { Order } from '../../../../../../shared/models/order.model';
import { User } from '../../../../../../shared/models/user.model';

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
