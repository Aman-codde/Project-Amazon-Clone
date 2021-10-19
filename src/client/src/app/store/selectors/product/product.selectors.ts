import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../..';
import * as fromProduct from '../../reducers/product/product.reducer'

const productFeatureSelector = createFeatureSelector<AppState, fromProduct.State>(fromProduct.productFeatureKey);

export const productsSelector = createSelector(
    productFeatureSelector,
    (state) => state.products
)

