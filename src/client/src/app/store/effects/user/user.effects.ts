import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {
  createUser,
  createUserFailure,
  createUserSuccess,
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  loginUser,
  loginUserFailure,
  loginUserSuccess,
  logoutUser,
  logoutUserFailure,
  logoutUserSuccess,
  NavigateOnLoginSuccess,
  NavigateOnSignUpSuccess,
  NavigateOnUpdateUserSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
} from '../../actions/user/user.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((data) => loadUsersSuccess({ data })),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      mergeMap((action) => 
        this.authService.login(action.data).pipe(
          tap(data => console.log("logged in data in effects: ",data)),
          map((data) => loginUserSuccess(data)),
          catchError((err) => {
            console.log(err);
            return of(loginUserFailure({err}))
          })
        )
      )
    )
  );

  logoutUser$ = createEffect( () => 
  this.actions$.pipe(
    ofType(logoutUser),
    mergeMap(() => 
    this.authService.logout().pipe(
      map(data => logoutUserSuccess({data})),
      catchError(err => of(logoutUserFailure(err))))
    ))
  );

  updateUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap((action) =>
        this.userService.updateUser(action.data).pipe(
          tap(data => console.log("updated user:",data)),
          map((data) => updateUserSuccess({ data })),
          catchError((error) => of(updateUserFailure({ error })))
        )
      )
    )
  );

  createUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      mergeMap((action) =>
        this.userService.createUser(action.data).pipe(
          map((data) => createUserSuccess({ data })),
          catchError((error) => of(createUserFailure({ error })))
        )
      )
    )
  );

  deleteUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap((action) =>
        this.userService.deleteUser(action.data).pipe(
          map((data) => deleteUserSuccess({ data })),
          catchError((error) => of(deleteUserFailure({ error })))
        )
      )
    )
  );

  navigateOnLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUserSuccess),
      mergeMap(() => 
      this.userService.NavigateOnLogin().pipe(
        map(() => NavigateOnLoginSuccess())
      ))
    )
  );

  navigateOnSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUserSuccess),
      mergeMap(() => 
      this.userService.NavigateOnSignUp().pipe(
        map(() => NavigateOnSignUpSuccess())
      ))
    )
  ); 

  navigateOnUpdateUser$ = createEffect(() => 
        this.actions$.pipe(
          ofType(updateUserSuccess),
          mergeMap(() => 
          this.userService.NavigateOnUpdateUser().pipe(
            map(()=> NavigateOnUpdateUserSuccess())
          ))
        )
  );

  constructor(
    private actions$: Actions, 
    private userService: UserService,
    private authService: AuthService
    ) 
    {}
}
