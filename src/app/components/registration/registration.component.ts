import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';


import {Router} from '@angular/router';
import {User} from '../../models/User';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  validMessage: string;
  public Questions: string[] = [
    'How do you call your pipi when you are alone? ', 'What is the name of your first Pet?', 'What is your mothers maiden name?',
    'How long can you last without breathing', 'Are you Stupid ?'];
  public skillModels: string [] = [
    'noob', 'intermediate', 'Pro', 'God', 'Beethoven was a Bitch!'
  ];
  user: User = new User();

  constructor(private bandService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  createUser(): any {
    console.log('Reached The Function');
    if (this.user) {
      this.validMessage = 'You are Registered';
      this.bandService.createUser(this.user).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/login']);
          return true;
        });
    } else {
      this.validMessage = 'please fill out the form';
    }
  }


}
