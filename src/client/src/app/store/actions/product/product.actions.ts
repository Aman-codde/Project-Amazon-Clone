import { createAction, props } from '@ngrx/store';
import { Product } from '../../../../../../shared/models/product.model';

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
