import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { User } from '../../../../shared/models/user.model';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  selectedUserId = '';

  constructor(
    private api: ApiService,
    private router: Router
    ) {}

  getUsers() {
    return this.api.get<{ data: User[] }>('users').pipe(map(res => res.data));
  }
  createUser(user: User) {
      return this.api.post<{data: User},User>('create-user', user).pipe(map(res => res.data));
  }
  updateUser(user: User) {
    return this.api.put<User,User>('update-user/' + user._id, user);
  }

  deleteUser(user: User) {
    return this.api.delete<{data: User}>('delete-user/' + user._id).pipe(map(res => res.data));
  }

  selectUser(id: string) {
    this.selectedUserId = id;  
  }

  NavigateOnLogin() {
    return of(this.router.navigate(['']));
  }

  NavigateOnSignUp() {
    return of(this.router.navigate(['/login']));
  }

  NavigateOnUpdateUser() {
    return of(this.router.navigate(['/account']))
  }

  NavigateOnLogout() {
    return of(this.router.navigate(['/login']));
  }

}
