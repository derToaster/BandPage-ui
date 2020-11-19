import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  isAdmin = false;

  constructor(private router: Router, private authService: AuthService) {

    this.authService.getIsAdmin().subscribe(data => {
      this.isAdmin = data;
    });
  }


  canActivate(): boolean {
    if (this.isAdmin) {
      return true;
      console.log(this.isAdmin);
    } else {
      this.router.navigate(['/userprofile']);
      return false;
      console.log(this.isAdmin);
    }
  }
}
