import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../../../../../shared/models/user.model';
import { createUserSuccess, deleteUserSuccess, loadUsersSuccess, loginUserFailure, loginUserSuccess, logoutUserSuccess, selectUserAction, updateUserSuccess } from '../../actions/user/user.actions';


export const userFeatureKey = 'user';

export interface State {
  users: User[];
  selectedUser: User | null;
  loggedUser: User|null;
  invalidLoginMsg: String
}

export const initialState: State = {
  users: [],
  selectedUser: null,
  loggedUser: null,
  invalidLoginMsg: ''
};


export const reducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, action) => {
    return { ...state, users: action.data }
  }),
  on(selectUserAction, (state, action) => {
    return { ...state, selectedUser: action.data }
  }),
  on(updateUserSuccess, (state, action) => {
    return {...state, users: state.users.map(user => user._id === action.data._id ? action.data : user)}
  }),
  on(deleteUserSuccess, (state, action) => {
    return {...state, users: state.users.filter(user => user._id !== action.data._id)}
  }),
  on(createUserSuccess, (state, action) => {
    const users = [...state.users];
    users.push(action.data);
    return {...state, users}
  }),
  on(loginUserSuccess, (state,action) => {
    return {...state, loggedUser: action.data}
  }),
  
  on(logoutUserSuccess, (state,action) => {
    return {...state, loggedUser: null}
  }),
  
  on(loginUserFailure, (state,action) => {
    console.log("login fails: ",action.err.message);
    return {...state, invalidLoginMsg: action.err.message}
  })
);

