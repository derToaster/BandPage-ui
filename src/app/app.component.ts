import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BandPage-ui';
  loggedIn: boolean;
  username: string;
  isAdmin = false;

  constructor(private router: Router,
              private authservice: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.authservice.getLoginstatus().subscribe(data => {
      this.loggedIn = data;
      this.username = sessionStorage.getItem('username');
      if (this.loggedIn) {
        this.userService.getUserByUsername(this.username).subscribe(response => {
          for (const role of response.role) {
            if (role.name === 'ADMIN') {
              this.isAdmin = true;
            }
          }
        });
      }
    });
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
