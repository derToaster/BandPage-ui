import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {BandService} from '../../services/band.service';

export interface DialogData {
  dialogName: string;
  dialogId: number;
}



@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ConfirmationDialogComponent>, private bandService: BandService,
               @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onClick(): void{
  this.dialogRef.close();
  }
  deleteUser(id: number): void{
    this.bandService.deleteOneUser(id);
    console.log('User Deleted');
    this.refreshPage();
  }

  refreshPage(): void{
    window.location.reload();
  }

}
