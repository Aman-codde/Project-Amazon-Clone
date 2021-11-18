import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { loggedUserSelector } from 'src/app/store/selectors/user/user.selectors';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {
  user$: Observable<User | null>;
  showName = false;
  showEmail = false;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) 
  { 
    this.user$ = this.store.select(loggedUserSelector);
  }

  ngOnInit(): void {
  }

  backToAccount() {
    this.router.navigate(['/account']);
  }

  onToggleName() {
    this.showName = !this.showName;
  }

  onToggleEmail() {
    this.showEmail = !this.showEmail;
  }

}
