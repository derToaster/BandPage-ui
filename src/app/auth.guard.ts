import {Injectable, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isLoggedIn = false;

  constructor(private authService: AuthService,
              private router: Router) {
  authService.getLoginstatus().subscribe(data => this.isLoggedIn = data);
  }

  canActivate(): boolean {
    return this.isLoggedIn;
  }
}
