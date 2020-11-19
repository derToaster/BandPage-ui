import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {UserProviderService} from '../../services/user-provider.service';
import {User} from '../../models/User';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UserProfilePageComponent implements OnInit, OnDestroy {
  user: User;
  userDataSubscribtion: Subscription = Subscription.EMPTY;
  isApproved = false;

  constructor(private userProvider: UserProviderService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userProvider.loadUser();
    this.userDataSubscribtion = this.userProvider.getData().subscribe(data => {
      this.user = data;
    });
    this.authService.isUserAdmin();
  }

  ngOnDestroy(): void {
    this.userDataSubscribtion.unsubscribe();
  }

}
