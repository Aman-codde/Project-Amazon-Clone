import { Action, createReducer, on } from '@ngrx/store';
import { Product } from '../../../../../../shared/models/product.model';
import { createProductSuccess, loadProductsSuccess, loadProductSuccess, selectProductAction } from '../../actions/product/product.actions';


export const productFeatureKey = 'product';

export interface State {
  products: Product[];
  product: Product | null;
  selectedProduct: Product | null
}

export const initialState: State = {
  products: [],
  product: null,
  selectedProduct: null
};


export const reducer = createReducer(
  initialState,
  on(createProductSuccess, (state, action) => {
    const products = [...state.products];
    products.push(action.data);
    return {...state,products}
  }),
  on(loadProductsSuccess, (state, action) => {
    //console.log(action.data)
    return {...state, products: action.data}
  }),
  on(loadProductSuccess, (state, action) => {
    return {...state, product: action.data}
  }),

  on(selectProductAction, (state,action) => {
    return  {...state, selectedProduct: action.data}
  })
);

