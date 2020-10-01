import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import {BandService} from '../../services/band.service';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<DataTableItem>;
  dataSource: DataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'username', 'email', 'instrument'];
  constructor(private userService: BandService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSource = new DataTableDataSource(this.userService);
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
