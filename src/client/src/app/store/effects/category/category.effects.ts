import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService } from 'src/app/services/category.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { loadCategories, loadCategoriesFailure, loadCategoriesSuccess } from '../../actions/category/category.actions';

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


  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
    ) {}

}
