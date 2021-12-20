import { createReducer, on } from '@ngrx/store';
import { User } from '../../../../../../shared/models/user.model';
import { createUserFailure, createUserSuccess, deleteUserSuccess, loadUsersSuccess, loginUserFailure, loginUserSuccess, logoutUserSuccess, selectUserAction, updateUserSuccess } from '../../actions/user/user.actions';


export const userFeatureKey = 'user';

export interface State {
  users: User[];
  selectedUser: User | null;
  loggedUser: User|null;
  invalidLoginMsg: Error|null;
  createUserFailureMsg: Error | null;
}

export const initialState: State = {
  users: [],
  selectedUser: null,
  loggedUser: null ,
  invalidLoginMsg: null,
  createUserFailureMsg: null
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
    return {...state, loggedUser: action.data}
  }),
  on(deleteUserSuccess, (state, action) => {
    return {...state, users: state.users.filter(user => user._id !== action.data._id)}
  }),
  on(createUserSuccess, (state, action) => {
    const users = [...state.users];
    users.push(action.data);
    return {...state, users}
  }),
  on(createUserFailure, (state,action) => {
  return {...state, createUserFailureMsg: action.error};
  }),
  on(loginUserSuccess, (state,action) => {
    if(action.data) {
      localStorage.setItem('user token', JSON.stringify(action.data))
    }
    return {...state, loggedUser: action.data}
  }),
  
  on(logoutUserSuccess, (state,action) => {
    localStorage.removeItem('user token');
    return {...state, loggedUser: null}
  }),
  
  on(loginUserFailure, (state,action) => {
    console.log("login fails: ",action.error);
    return {...state, invalidLoginMsg: action.error}
  })
);



