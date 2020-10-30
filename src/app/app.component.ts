import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';
import {UserProviderService} from './services/user-provider.service';

// import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BandPage-ui';
  loggedIn: boolean;
  username: string ;

  constructor(private router: Router,
              private authservice: AuthService) {
  }

  ngOnInit(): void {
    this.authservice.getLoginstatus().subscribe(data => {
      this.loggedIn = data;
    });
    this.username =  sessionStorage.getItem('username');
  }

  redirectClick(uri: string): void {
    this.router.navigate([{uri}]);
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
