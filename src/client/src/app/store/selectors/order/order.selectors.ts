import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../..';
import * as fromOrder from '../../reducers/order/order.reducer'

const orderFeatureSelector = createFeatureSelector<AppState, fromOrder.State>(fromOrder.orderFeatureKey);

export const ordersSelector = createSelector(
    orderFeatureSelector, (state) => state.orders
);

