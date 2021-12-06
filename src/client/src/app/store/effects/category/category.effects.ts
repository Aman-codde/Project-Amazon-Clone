import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService } from 'src/app/services/category.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { createCategory, createCategoryFailure, createCategorySuccess, loadCategories, loadCategoriesFailure, loadCategoriesSuccess } from '../../actions/category/category.actions';

@Injectable()
export class CategoryEffects {

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategories),
      mergeMap(() =>
        this.categoryService.getCategories().pipe(
          map((data) => loadCategoriesSuccess({data})),
          catchError((error) => of(loadCategoriesFailure({ error })))
        )
      )
    )
  );

  createCategory$ = createEffect( () => 
    this.actions$.pipe(
      ofType(createCategory),
      mergeMap( (action) => 
      this.categoryService.createCategory(action.data).pipe(
        map(data => createCategorySuccess({data})),
        catchError(error => of(createCategoryFailure(error)))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
    ) {}

}
