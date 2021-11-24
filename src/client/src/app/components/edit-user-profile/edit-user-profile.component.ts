import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { updateUser } from 'src/app/store/actions/user/user.actions';
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
  editUserName: FormGroup;
  editUserEmail: FormGroup;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private fb: FormBuilder
  ) 
  { 
    this.editUserName = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    this.editUserEmail = this.fb.group({
      email: ['', Validators.required]
    })

    this.user$ = this.store.select(loggedUserSelector);
  }

  ngOnInit(): void {}

  updateName() {
    console.log("updateName",this.editUserName.value);
    this.store.dispatch(updateUser({data: {...this.editUserName.value}}))
  }

  updateEmail() {
    console.log("updateEmail",this.editUserEmail.value);
    this.store.dispatch(updateUser({data: {...this.editUserEmail.value}}))
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
