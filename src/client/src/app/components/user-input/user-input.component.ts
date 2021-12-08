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
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import {
  createUser,
  updateUser,
} from 'src/app/store/actions/user/user.actions';
import { createUserMessageSelector } from 'src/app/store/selectors/user/user.selectors';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss'],
})
export class UserInputComponent implements OnInit {
  addUserForm: FormGroup;
  @Input() selectedUser: User | null = null;
  createUserFailureMsg: any

  constructor(
    private fb: FormBuilder, 
    private store: Store<AppState>,
    private router: Router
    ) 
    {
    this.addUserForm = this.fb.group({
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

    this.store.select(createUserMessageSelector).subscribe(data => this.createUserFailureMsg = data);
  }

  ngOnInit(): void {}

  postUser() {
    this.store.dispatch(createUser({ data: this.addUserForm.value }))
    this.addUserForm.reset();
  }

  goToSignIn() {
    this.router.navigate(['/login']);
  }

}
