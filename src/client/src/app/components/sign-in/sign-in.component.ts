import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { loginUser } from 'src/app/store/actions/user/user.actions';
import { loggedUserSelector, loginUserMessageSelector } from 'src/app/store/selectors/user/user.selectors';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loggedUser: User | null = null;
  loginUserForm: FormGroup;
  invalidMsg$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
    ) {
    this.loginUserForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.invalidMsg$ = this.store.select(loginUserMessageSelector);

    this.loggedUser = JSON.parse(localStorage.getItem('token') || '{}');
    console.log(">>>>",this.loggedUser);
   }

  ngOnInit(): void {
  }

  authUser() {
    this.store.dispatch(loginUser({data: this.loginUserForm.value}));
    this.loginUserForm.reset();
  }

  goToSignUp() {
    this.router.navigate(['/users']);
  }

}
