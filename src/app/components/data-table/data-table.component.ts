import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BandService} from '../../services/band.service';
import {Observable} from 'rxjs';
import {IUser} from '../../models/IUser';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  dataSource = new UserDataSource(this.userService);
  displayedColumns = ['name', 'username', 'email', 'instrument'];

  constructor(private userService: BandService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(name: string, userId: number): void {
    const dialogref = this.dialog.open(ConfirmationDialogComponent, {
      data: { dialogName: name, dialogId: userId}});
  }

}



export class UserDataSource extends DataSource<any>{
  constructor(private userService: BandService) {
    super();
  }
  connect(): Observable<IUser[]> {
    return this.userService.getUsers();
  }
  disconnect(): void {
  }
}
