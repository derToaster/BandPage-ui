import {Component, Input, OnInit} from '@angular/core';
import {BandService} from '../../services/band.service';
import {IUser} from '../../models/IUser';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public users: IUser;

  constructor(private bandService: BandService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
// #TODO dialog for deletion of user


}
