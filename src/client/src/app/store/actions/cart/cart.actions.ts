import { createAction, props } from '@ngrx/store';
import { Cart } from '../../../../../../shared/models/cart.model';
import { Product } from '../../../../../../shared/models/product.model';

export const loadCart = createAction(
  '[Cart] Load Cart'
);

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{data: Cart}>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{error: Error}>()
);

export const updateCart = createAction(
  '[Cart] Update Cart',
  props<{data: Product, selected_qty: number}>()
);

export const updateCartSuccess = createAction(
  '[Cart] Update Cart Success',
  props<{ data: Cart }>()
);

export const updateCartFailure = createAction(
  '[Cart] Update Cart Failure',
  props<{ error: Error }>()
);

export const deleteProductFromCart = createAction(
  '[Cart] Delete Product From Cart',
  props<{data: Product}>()
);

export const deleteProductFromCartSuccess = createAction(
  '[Cart] Delete Product From Cart Success',
  props<{data: Cart}>()
);

export const deleteProductFromCartFailure = createAction(
  '[Cart] Delete Product From Cart Failure',
  props<{error: Error}>()
);

export const navigateOnUpdateCartSuccess = createAction(
  '[Cart] Navigate on Update Cart Success'
);
