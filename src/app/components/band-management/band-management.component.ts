import {Component, EventEmitter, OnInit} from '@angular/core';
import {SortableColumn} from '../../sorting/sortable-column';
import {Page} from '../../pagination/page';
import {BandService} from '../../services/band.service';
import {Band} from '../../models/Band';
import {BandManagementDialogComponent} from './band-management-dialog/band-management-dialog.component';
import {CustomSortingService} from '../../services/custom-sorting.service';
import {CustomPaginationService} from '../../services/custom-pagination.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-band-management',
  templateUrl: './band-management.component.html',
  styleUrls: ['./band-management.component.css']
})
export class BandManagementComponent implements OnInit {
  keyword: string = null;
  soerenBands: Band[] = null;
  sortEvent: EventEmitter<SortableColumn> = new EventEmitter<SortableColumn>();
  page: Page<Band> = new Page();
  sortableColumns: Array<SortableColumn> = [
    new SortableColumn('id', 'id', 'ID', 'asc'),
    new SortableColumn('name', 'name', 'Name', null),
    new SortableColumn('owner', 'owner', 'Owner', null),
    new SortableColumn('genre', 'genre', 'Genre', null)
  ];

  constructor(private bandService: BandService,
              private paginationService: CustomPaginationService,
              private sortingService: CustomSortingService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getData();
    this.getSoerenBands();
  }

  private getSoerenBands(): void {
    this.bandService.getSoerenBands().subscribe(data => {
      this.soerenBands = data;
    });
  }

  private getData(): void {
    let column = this.sortingService.getSortableColumn(this.sortableColumns);
    this.bandService.getBandPage(this.page.pageable, column).subscribe(page => {
      this.page = page;
    });
  }

  public searchData(): void {
    let column = this.sortingService.getSortableColumn(this.sortableColumns);
    this.bandService.searchPage(this.page.pageable, column, this.keyword).subscribe(page => {
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
    const dialogref = this.dialog.open(BandManagementDialogComponent, {
      data: {dialogName: name, dialogId: userId}
    });
    dialogref.afterClosed().subscribe(() => {
      this.getData();
      this.getSoerenBands();
    });
  }
}
