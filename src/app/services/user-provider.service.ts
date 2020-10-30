import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IUser} from '../models/IUser';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BandService} from './band.service';

@Injectable({
  providedIn: 'root'
})
export class UserProviderService {
  private Datastore = new BehaviorSubject<IUser>(null);
  constructor(private http: HttpClient, private userService: BandService) {
  }
  getData(): Observable<IUser>{
    return this.Datastore.asObservable();
  }

  loadUser(): void{
    this.userService.getUserByUsername(sessionStorage.getItem('username')).subscribe(data => {
      this.Datastore.next(data);
    });

  }


}
