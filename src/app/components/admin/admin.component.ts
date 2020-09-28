import { Component, OnInit } from '@angular/core';
import {BandService} from '../../services/band.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public users: any;

  constructor(private bandService: BandService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): any{
  this.bandService.getUsers().subscribe(
  data => this.users = data,
    err => console.error(err),
    () => console.log('Users loaded')
  );
  }
}
