import { createAction, props } from '@ngrx/store';
import { User } from '../../../../../../shared/models/user.model';

export const loadUsers = createAction(
  '[User] Load Users'
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ data: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: Error }>()
);

export const selectUserAction = createAction(
  '[User] Select User',
  props<{ data: User | null }>()
);

export const createUser = createAction(
  '[User] Create User',
  props<{data: User}>()
);

export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ data: User }>()
);

export const createUserFailure = createAction(
  '[User] Create User Failure',
  props<{ error: Error }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{data: User}>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ data: User }>()
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: Error }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{data: User}>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ data: User }>()
);

export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: Error }>()
);

export const loginUser = createAction(
  '[User] Login User',
  props<{data: Partial<User>}>()
);

export const loginUserSuccess = createAction(
  '[User] Login User Success',
  props<{data: User}>()
);

export const loginUserFailure = createAction(
  '[User] Login User Failure',
  props<{err: Error}>()
);

export const logoutUser = createAction(
  '[User] Logout User'
);

export const logoutUserSuccess = createAction(
  '[User] Logout User Success',
  props<{data: string}>()
);

export const logoutUserFailure = createAction(
  '[User] Logout User Failure',
  props<{err: Error}>()
);

export const NavigateOnLoginSuccess = createAction(
  '[User] Navigate On Login Success'
);

export const NavigateOnSignUpSuccess = createAction(
  '[User] Navigate On SignUp Success'
);

export const NavigateOnUpdateUserSuccess = createAction(
  '[User] Navigate On Update User Success'
);

export const NavigateOnLogoutSuccess = createAction(
  '[User] Navigate On Logout Success'
);
