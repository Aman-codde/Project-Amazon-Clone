import { createReducer, on } from '@ngrx/store';
import { Category } from '../../../../../../shared/models/category.model';
import { createCategorySuccess, loadCategoriesSuccess } from '../../actions/category/category.actions';


export const categoryFeatureKey = 'category';

export interface State {
  categories: Category[];
}

export const initialState: State = {
  categories: []
};


export const reducer = createReducer(
  initialState,
  on(loadCategoriesSuccess, (state, action) => {
    return {...state, categories: action.data}
  }),
  on(createCategorySuccess, (state, action) => {
    const categories = [...state.categories];
    categories.push(action.data)
    return {...state, categories}
  })
);

