import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BandService} from '../../../services/band.service';

export interface DialogData {
  dialogName: string;
  dialogId: number;
}
@Component({
  selector: 'app-band-management-dialog',
  templateUrl: './band-management-dialog.component.html',
  styleUrls: ['./band-management-dialog.component.css']
})
export class BandManagementDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<BandManagementDialogComponent>, private bandService: BandService,
               @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onClick(): void{
    this.dialogRef.close();
  }
  deleteUser(id: number): void{
    this.bandService.deleteBand(id);
    console.log('User Deleted');
    this.dialogRef.close();
  }
}
