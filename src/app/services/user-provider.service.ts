import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/User';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserProviderService {
  private Datastore = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private userService: UserService) {
  }
  getData(): Observable<User>{
    return this.Datastore.asObservable();
  }

  loadUser(): void{
    this.userService.getUserByUsername(sessionStorage.getItem('username')).subscribe(data => {
      this.Datastore.next(data);
    });

  }


}
