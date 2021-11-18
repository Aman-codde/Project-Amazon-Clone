import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  constructor(
    private router: Router
  ) 
  { }

  ngOnInit(): void {
  }

  getOrderHistory() {
    return this.router.navigate(['/order-history']);
  }

  updateProfile() {
    return this.router.navigate(['/edit-profile']);
  }

  deleteAccount() {
    return this.router.navigate(['/edit-profile']);
  }

}
