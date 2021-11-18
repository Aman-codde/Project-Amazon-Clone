import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { Order } from '../../../../../../shared/models/order.model';
import { loadOrdersSuccess } from '../../actions/order/order.actions';


export const orderFeatureKey = 'order';

export interface State {
  orders: Order[];
}

export const initialState: State = {
  orders: []
};


export const reducer = createReducer(
  initialState,
  on(loadOrdersSuccess, (state,action) => {
    return {...state, orders:action.data}
  })
);

