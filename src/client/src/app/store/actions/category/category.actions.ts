import { createAction, props } from '@ngrx/store';
import { Category } from '../../../../../../shared/models/category.model';

export const loadCategories = createAction(
  '[Category] Load Categories'
);

export const loadCategoriesSuccess = createAction(
  '[Category] Load Categories Success',
  props<{ data: Category[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Category] Load Categories Failure',
  props<{ error: Error }>()
);


export const createCategory = createAction(
  '[Category] Create Category',
  props<{data: Category}>()
);

export const createCategorySuccess = createAction(
  '[Category] Create Category Success',
  props<{data: Category}>()
);

export const createCategoryFailure = createAction(
  '[Category] Create Category Failure',
  props<{error: Error}>()
);
