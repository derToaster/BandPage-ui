import {Component, OnDestroy, OnInit} from '@angular/core';
import {BandService} from '../../services/band.service';
import {UserProviderService} from '../../services/user-provider.service';
import {IUser} from '../../models/IUser';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit, OnDestroy {
  user: IUser;
  userDataSubscribtion: Subscription = Subscription.EMPTY;
  constructor(private userProvider: UserProviderService) {
  }

  ngOnInit(): void {
    this.userProvider.loadUser();
    this.userDataSubscribtion = this.userProvider.getData().subscribe(data => {
      this.user = data;
      console.log(data);
    });
  }
  ngOnDestroy(): void {
    this.userDataSubscribtion.unsubscribe();
  }

}
