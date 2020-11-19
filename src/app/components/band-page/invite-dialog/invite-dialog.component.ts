import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/User';
import {Band} from '../../../models/Band';
import {Notifications} from '../../../models/Notifications';
import {NotificationService} from '../../../services/notification.service';

export interface InviteData {
  sender: User;
  band: Band;
}

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.css']
})

export class InviteDialogComponent implements OnInit {
  users: User[] = [];
  invite: Notifications = new Notifications();

  constructor(public dialogRef: MatDialogRef<InviteDialogComponent>,
              private userService: UserService, private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: InviteData) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data as User[];
    });
  }

  onClick(): void {
    this.dialogRef.close();
  }

  createInvite(sender: User, band: Band): void {
    this.invite.message = sender.username + ' invited you to join his band ' + band.name;
    this.invite.band = band;
    this.invite.sender = sender;
    this.invite.isDeny = false;
    console.log('Invite: ' + this.invite);
    this.notificationService.createNotification(this.invite).subscribe(data => console.log(data));
    this.dialogRef.close();
  }


}
