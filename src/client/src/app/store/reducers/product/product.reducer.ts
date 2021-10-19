import { Action, createReducer, on } from '@ngrx/store';
import { Product } from '../../../../../../shared/models/product.model';
import { createProductSuccess } from '../../actions/product/product.actions';


export const productFeatureKey = 'product';

export interface State {
  products: Product[];
}

export const initialState: State = {
  products: []
};


export const reducer = createReducer(
  initialState,
  on(createProductSuccess, (state, action) => {
    const products = [...state.products];
    products.push(action.data);
    return {...state,products}
  })
);
