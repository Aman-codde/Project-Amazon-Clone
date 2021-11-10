import { Injectable } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private api: ApiService
  ) 
  { }

  login(user: Partial<User>) {
    return this.api.post<{data: User},Partial<User>>('login',user);
  }

  logout() {
    console.log("logout in services called");
    return this.api.get<string>('logout');
  }

  checkLogin() {
    return this.api.get<User>('check-login');
  }

}
