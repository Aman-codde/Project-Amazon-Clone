import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../..';
import * as fromCategory from '../../reducers/category/category.reducer';

const categoryFeatureSelector = createFeatureSelector<AppState, fromCategory.State>(fromCategory.categoryFeatureKey);

export const categoriesSelector = createSelector(
    categoryFeatureSelector,
    (state) => state.categories
  );
