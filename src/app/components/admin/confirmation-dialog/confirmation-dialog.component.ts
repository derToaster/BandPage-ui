import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../../services/user.service';

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

  constructor( public dialogRef: MatDialogRef<ConfirmationDialogComponent>, private bandService: UserService,
               @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onClick(): void{
  this.dialogRef.close();
  }
  deleteUser(id: number): void{
    this.bandService.deleteOneUser(id);
    console.log('User Deleted');
    this.dialogRef.close();
  }
}
