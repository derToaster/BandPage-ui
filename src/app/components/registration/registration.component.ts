import { Component, OnInit } from '@angular/core';
import {BandService} from '../../services/band.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import validate = WebAssembly.validate;
import {Observable} from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  forms: FormGroup;
  validMessage: string;
  public instrumentModels: string[] = [
    'Guitar', 'Drums', 'Bass', 'Keys', 'Sax', 'Trompet', 'Trombone', 'Flute', 'Vocal'];
  public skillModels: string [] = [
    'noob', 'intermediate', 'Pro', 'God', 'Beethoven was a Bitch!'
  ];

  constructor(private bandService: BandService) {
  }

  ngOnInit(): void {
    this.forms = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }
  createUser(): any {
    console.log('Reached The Function');
    if (this.forms.valid){
      this.validMessage = 'You are Registered';
      this.bandService.createUser(this.forms.value).subscribe(
      data => {
        console.log(data);
        this.forms.reset();
        return true;
      },
      error => {
        return Observable.throw(error);
      }
    );
  }else {
    this.validMessage = 'please fill out the form';
    }
  }


}
