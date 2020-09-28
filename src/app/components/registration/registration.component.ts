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
  public models: string[] = [
    'Guitar', 'Drums', 'Bass', 'Keys', 'Sax', 'Trompet', 'Trombone', 'Flute', 'Vocal'];

  constructor(private bandService: BandService) {
  }

  ngOnInit(): void {
    this.forms = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      instrument: new FormControl('', Validators.required)
    });
  }
  createUser(): any {
    if (this.forms.valid){
      this.validMessage = 'You are Registered';
      this.bandService.createUser(this.forms.value).subscribe(
      data => {
        this.forms.reset;
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
