import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {BandService} from '../../services/band.service';
import {IUser} from '../../models/IUser';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {Observable} from 'rxjs';
import {Page} from '../../pagination/page';
import {CustomPaginationService} from '../../services/custom-pagination.service';
import {CustomSortingService} from '../../services/custom-sorting.service';
import {SortableColumn} from '../../sorting/sortable-column';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  sortEvent: EventEmitter<SortableColumn> = new EventEmitter<SortableColumn>();
  page: Page<IUser> = new Page();
  sortableColumns: Array<SortableColumn> = [
    new SortableColumn('id', 'id', 'ID', 'asc'),
    new SortableColumn('name', 'Name', 'Name', null),
    new SortableColumn('username', 'username', 'Username', null),
    new SortableColumn('email', 'email', 'Email', null),
    new SortableColumn('instrument', 'instrument', 'Instruments and Skill', null)
  ];
  constructor(private bandService: BandService,
              private paginationService: CustomPaginationService,
              private sortingService: CustomSortingService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData();
  }
private getData(): void {
    let column = this.sortingService.getSortableColumn(this.sortableColumns);
    this.bandService.getPage(this.page.pageable, column).subscribe(page => {
      this.page = page;
    });
}
public getNextPage(): void {
    this.page.pageable = this.paginationService.getNextPage(this.page);
    this.getData();
}
public getPreviousPage(): void {
    this.page.pageable = this.paginationService.getPrevioussPage(this.page);
    this.getData();
}
public getPageInNewSize(pageSize: number): void {
    this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
    this.getData();
}
public sort(sortableColumn: SortableColumn): void {
    sortableColumn.toggleDirection();
    this.sortingService.clearPreviousSorting(sortableColumn, this.sortableColumns);
    this.getData();
}
  openDialog(name: string, userId: number): void {
    const dialogref = this.dialog.open(ConfirmationDialogComponent, {
      data: { dialogName: name, dialogId: userId}});
  }



}
