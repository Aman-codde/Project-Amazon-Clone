import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginUser: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginUser = this.fb.group({
      email: ['', Validators.required],
      hashedPassword: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

}
