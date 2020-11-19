import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Band} from '../../models/Band';
import {BandService} from '../../services/band.service';
import {UserProviderService} from '../../services/user-provider.service';
import {Subscription} from 'rxjs';
import {User} from '../../models/User';
import {MatDialog} from '@angular/material/dialog';
import {InviteDialogComponent} from './invite-dialog/invite-dialog.component';
import {Notifications} from '../../models/Notifications';
import {NotificationService} from '../../services/notification.service';
import {MembershipService} from '../../services/membership.service';
import {BandMembership} from '../../models/band-membership';
import {Router} from '@angular/router';


@Component({
  selector: 'app-band-page',
  templateUrl: './band-page.component.html',
  styleUrls: ['./band-page.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BandPageComponent implements OnInit, OnDestroy {
  ownedBands: Band[] = [];
  memberBands: Band[] = [];
  invites: Notifications[] = [];
  memberships: BandMembership[] = [];
  userSubscription: Subscription = Subscription.EMPTY;
  username: string;
  user: User;
  deny: Notifications;


  constructor(private bandService: BandService, private userProvider: UserProviderService,
              private dialog: MatDialog, private notificationService: NotificationService, private membershipService: MembershipService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.userProvider.loadUser();
    this.userProvider.getData().subscribe(data => {
      this.user = data;
      this.ownedBands = data.ownership;
      this.invites = data.received;
      this.memberships = data.memberships;

    });
    for (const members of this.memberships) {
      this.bandService.getBandById(members.band.id).subscribe(value => {
        if (value) {
          this.memberBands.push(value);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  deleteMember(membershipId: number): void {
    this.membershipService.deleteMembership(membershipId);
  }

  deleteBand(bandId: number): void {
    this.bandService.deleteBand(bandId);
    this.getData();
  }

  openDialog(sender: User, band: Band): void {
    const dialogref = this.dialog.open(InviteDialogComponent, {
      data: {sender, band}
    });
    dialogref.afterClosed().subscribe(() => {
      this.getData();
    });
  }

  acceptInvitation(inviteId: number, bandId: number, memberId: number): void {
    this.membershipService.createMembership(memberId, bandId).subscribe(data => console.log('created: ' + data));
    this.notificationService.deleteNotification(inviteId);
    this.router.navigate(['/band']);
    this.getData();
  }

  denyInvitation(inviteId: number, receiver: User, band: Band): void {
    this.deny.receiver = receiver;
    this.deny.band = band;
    this.deny.message = this.user.username + ' has denied your invitation for membership in ' + band.name;
    this.deny.isDeny = true;
    this.notificationService.createNotification(this.deny).subscribe(data => console.log(data));
    this.notificationService.deleteNotification(inviteId);
    this.router.navigate(['/band']);
    this.getData();
  }

  deleteDeny(denyId: number): void {
    this.notificationService.deleteNotification(denyId);
    this.getData();
  }
}
