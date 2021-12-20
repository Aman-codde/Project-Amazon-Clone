import { createReducer, on } from '@ngrx/store';
import { Product } from '../../../../../../shared/models/product.model';
import { createProductSuccess, deleteProductSuccess, loadProductsSuccess, loadProductSuccess, selectProductAction, selectProductToUpdateAction, updateProductSuccess } from '../../actions/product/product.actions';

export const productFeatureKey = 'product';

export interface State {
  products: Product[];
  product: Product | null;
  selectedProduct: Product | null;
  selectedProductToUpdate: Product | null;
}

export const initialState: State = {
  products: [],
  product: null,
  selectedProduct: null,
  selectedProductToUpdate: null
};


export const reducer = createReducer(
  initialState,
  on(createProductSuccess, (state, action) => {
    const products = [...state.products];
    products.push(action.data);
    return {...state,products}
  }),
  on(loadProductsSuccess, (state, action) => {
    return {...state, products: action.data}
  }),
  on(loadProductSuccess, (state, action) => {
    return {...state, product: action.data}
  }),
  on(selectProductAction, (state,action) => {
    return  {...state, selectedProduct: action.data}
  }),
  on(selectProductToUpdateAction, (state,action) => {
    return {...state, selectedProductToUpdate: action.data}
  }),
  on(updateProductSuccess, (state, action) => {
    const products =[...state.products];
    products.push(action.data)
    return {...state, selectedProductToUpdate: action.data, products}
  }),
  on(deleteProductSuccess, (state,action) => {
    const products = [...state.products];
    products.push(action.data);
    return {...state, selectedProductToUpdate: action.data}
  })

);

