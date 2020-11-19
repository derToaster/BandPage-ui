import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user;
  @Input() userID;
  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const userID = this.route.snapshot.paramMap.get('id');
    if (userID){
      const id = +userID;
      this.userService.getOneUser(id).subscribe(data => {
        this.user = data;
      });
    }

  }

}
