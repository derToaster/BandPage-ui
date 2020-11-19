import {ChangeDetectionStrategy, Component, EventEmitter, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {Page} from '../../pagination/page';
import {CustomPaginationService} from '../../services/custom-pagination.service';
import {CustomSortingService} from '../../services/custom-sorting.service';
import {SortableColumn} from '../../sorting/sortable-column';
import {MailService} from '../../services/mail.service';
import {Mail} from '../../models/Mail';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminComponent implements OnInit {
  keyword: string = null;
  mail: Mail = new Mail();
  sortEvent: EventEmitter<SortableColumn> = new EventEmitter<SortableColumn>();
  page: Page<User> = new Page();
  sortableColumns: Array<SortableColumn> = [
    new SortableColumn('id', 'id', 'ID', 'asc'),
    new SortableColumn('username', 'username', 'Username', null),
    new SortableColumn('email', 'email', 'Email', null),
    new SortableColumn('instrument', 'instrument', 'Instruments and Skill', null)
  ];

  constructor(private userService: UserService,
              private paginationService: CustomPaginationService,
              private sortingService: CustomSortingService,
              private dialog: MatDialog, private mailService: MailService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    let column = this.sortingService.getSortableColumn(this.sortableColumns);
    this.userService.getPage(this.page.pageable, column).subscribe(page => {
      this.page = page;
    });
  }
  public searchData(): void{
    let column = this.sortingService.getSortableColumn(this.sortableColumns);
    this.userService.searchPage(this.page.pageable, column, this.keyword).subscribe(page => {
      this.page = page;
      console.log(page);
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
      data: {dialogName: name, dialogId: userId}
    });
    dialogref.afterClosed().subscribe(() => {
      this.getData();
    });
  }

  approveUser(userId: number, username: string, userMail: string): void {
    this.userService.approveUser(userId).subscribe(data => console.log(data));
    this.mail.name = username;
    this.mail.email = userMail;
    this.mail.subject = 'BandPage Account Approval';
    this.mail.message = 'The admin has approved you and your account is now fully usable! Seems like you got something in you';
    this.mailService.sendMail(this.mail).subscribe(data => console.log(data));
    this.getData();
  }


  deleteUser(id: number, username: string, userMail: string): void {
    this.mail.name = username;
    this.mail.email = userMail;
    this.mail.subject = 'BandPage Account Denied by Admin';
    this.mail.message = 'The admin has not approved you and your pending account was deleted ! Dont worry its not you its the lack of your talents. Maybe try the bass?';
    this.mailService.sendMail(this.mail).subscribe(data => console.log(data));
    this.userService.deleteOneUser(id);
    this.getData();
  }
}
