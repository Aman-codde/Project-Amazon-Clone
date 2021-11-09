import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  checkLogin$! : Observable<User | null>;
  loginUser: User | null = null;
  username = '';

  constructor(
    private authService: AuthService
  ) 
  { 
    this.checkLogin$ = this.authService.checkLogin();
  }

  logout() {
    this.authService.logout().subscribe();
  }

  // <li>
  //       <a *ngIf = "(checkLogin$ | async) !== null">Hello, {{displayLoginUserName()}}</a>
  // </li>

  displayLoginUserName() {
    this.authService.checkLogin().subscribe(data => console.log(data.firstName)
    );
  }

}
