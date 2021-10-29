import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { loginUser } from 'src/app/store/actions/user/user.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loggedUser$!: Observable<any>
  loginUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
    ) {
    this.loginUser = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  authUser() {
    this.store.dispatch(loginUser({data: this.loginUser.value}));
    this.loginUser.reset();
    //this.loggedUser$ = this.store.select(loggedUserSelector)
  }

  goToSignUp() {
    this.router.navigate(['/users']);
  }

}
