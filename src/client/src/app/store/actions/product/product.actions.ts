import { createAction, props } from '@ngrx/store';
import { Product } from '../../../../../../shared/models/product.model';

//create new product
export const createProduct = createAction(
  '[Product] Create Product',
  props<{data: Product}>()
);

export const createProductSuccess = createAction(
  '[Product] Create Product Success',
  props<{ data: Product }>()
);

export const createProductFailure = createAction(
  '[Product] Create Product Failure',
  props<{ error: Error }>()
);

//load products (list of products)
export const loadProducts = createAction(
  '[Product] Load Products',
  props<{data: string}>()
);

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{data: Product[]}>()
);

export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{err: Error}>()
)

//show one product
export const loadProduct = createAction(
  '[Product] Load Product',
  props<{data: string}>()
);

export const loadProductSuccess = createAction(
  '[Product] Load Product Success',
  props<{ data: Product }>()
);

export const loadProductFailure = createAction(
  '[Product] Load Product Failure',
  props<{ error: Error }>()
);

// selected product 
export const selectProductAction = createAction(
  '[Product] Select Product',
  props<{ data: Product | null }>()
)
