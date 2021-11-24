import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  createUser,
  updateUser,
} from 'src/app/store/actions/user/user.actions';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss'],
})
export class UserInputComponent implements OnInit {
  addUser: FormGroup;
  @Input() selectedUser: User | null = null;

  constructor(
    private fb: FormBuilder, 
    private store: Store<AppState>,
    private router: Router
    ) 
    {
    this.addUser = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: [
        '',
        Validators.compose([Validators.required, Validators.minLength(7)]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
    });
  }

  ngOnInit(): void {}

  postUser() {
    this.store.dispatch(createUser({ data: this.addUser.value }))
    this.addUser.reset();
  }

  goToSignIn() {
    this.router.navigate(['/login']);
  }

}
