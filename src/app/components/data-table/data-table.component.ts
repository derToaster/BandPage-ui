import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';

import {BandService} from '../../services/band.service';

import {IUser} from '../../models/IUser';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';

import {MatSort, Sort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {async, Observable} from 'rxjs';
import {DataTableDatasource} from './data-table-datasource';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-data-table-example',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, AfterViewInit {
  users: Observable<IUser[]>;
  dataSource: DataTableDatasource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<IUser>;
  displayedColumns = ['name', 'username', 'email', 'instrument'];

  constructor(private userService: BandService, private dialog: MatDialog, ) { }
  ngOnInit(): void {
    this.dataSource = new DataTableDatasource(this.userService);
    this.users = this.userService.users;
    this.userService.getUsers();
    this.users.subscribe(data => {
        console.log(data);
      });
  }
    ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  openDialog(name: string, userId: number): void {
    const dialogref = this.dialog.open(ConfirmationDialogComponent, {
      data: { dialogName: name, dialogId: userId}});
  }

}

