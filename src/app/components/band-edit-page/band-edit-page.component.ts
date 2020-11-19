import {Component, OnDestroy, OnInit} from '@angular/core';
import {Band} from '../../models/Band';
import {BandService} from '../../services/band.service';
import {User} from '../../models/User';
import {UserProviderService} from '../../services/user-provider.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-band-edit-page',
  templateUrl: './band-edit-page.component.html',
  styleUrls: ['./band-edit-page.component.css']
})
export class BandEditPageComponent implements OnInit, OnDestroy {
  userProviderSubscription: Subscription = Subscription.EMPTY;
  band: Band = new Band();
  user: User;
  message: string;
  constructor(private bandService: BandService, private userProvider: UserProviderService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userProvider.loadUser();
    this.userProviderSubscription = this.userProvider.getData().subscribe(data => {
      this.band.owner = data;
    });
  }

  ngOnDestroy(): void {
    this.userProviderSubscription.unsubscribe();
  }

  createBand(): void {
    if (sessionStorage.getItem('username').toLowerCase().includes('sören')){
      this.band.soeren = true;
    }
    console.log(this.band);
    this.bandService.createBand(this.band).subscribe(data => console.log(data));
    this.message = this.band.name + ' was created';
    this.router.navigate(['/band']);
  }

}
