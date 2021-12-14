import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { Order } from '../../../../../../shared/models/order.model';
import { createOrderSuccess, loadOrdersSuccess } from '../../actions/order/order.actions';


export const orderFeatureKey = 'order';

export interface State {
  orders: Order[];
  order: Order | null;
}

export const initialState: State = {
  orders: [],
  order: null
};


export const reducer = createReducer(
  initialState,
  on(loadOrdersSuccess, (state,action) => {
    return {...state, orders:action.data}
  }),
  on(createOrderSuccess, (state,action) => {
    return {...state, order: action.data}
  })

);

