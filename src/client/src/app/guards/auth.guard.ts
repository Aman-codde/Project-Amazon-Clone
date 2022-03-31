import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isValid: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private api: ApiService
  ) 
  { 
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authService.isAuthenticated().pipe(
        tap((isValid) => {
        if(!isValid)
          this.router.navigate(['']);
      }),
      catchError(() => {
        this.router.navigate(['']);
        return of(false);
      })
    );
  }
  
}
