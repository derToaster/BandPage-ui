import {Component, Input, OnInit} from '@angular/core';
import {BandService} from '../../services/band.service';
import {IUser} from '../../models/IUser';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
   users: Observable<IUser[]>;

  constructor(private bandService: BandService, private dialog: MatDialog) { }

  ngOnInit(): void {
   this.users = this.bandService.users;
   this.bandService.getUsers();
   this.users.subscribe(data => {
     console.log(data);
   });
  }



}
