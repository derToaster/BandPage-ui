import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IUser} from '../models/IUser';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class BandService {
  private _users: BehaviorSubject<IUser[]>;
  private dataStore: {
    users: IUser[];
  };
  constructor(private http: HttpClient) {
   this.dataStore = { users: []};
   this._users = new BehaviorSubject<IUser[]>([]);
  }
  get users(): Observable<IUser[]>{
    return this._users.asObservable();
  }
  getUsers() {
    return this.http.get<IUser[]>('/server/api/v1/users').subscribe(data => {
      this.dataStore.users = data;
      this._users.next(Object.assign({}, this.dataStore).users);
    }, error => console.log('Error: cannot Fetch Data'));
  }
  createUser(user): Observable<IUser>{
    const body = JSON.stringify(user);
    return this.http.post<IUser>('/server/api/v1/users', body, httpOptions);
  }
  getOneUser(id: number): Observable<IUser>{
    // let token = localStorage.getItem('access_token');
    return this.http.get<IUser>('/server/api/v1/users' + id,
      // {headers: new HttpHeaders().set('Authorization', 'Bearer' + token)}
    );
  }
  deleteOneUser(id: number): void{
    this.http.delete('/server/api/v1/users/' + id, httpOptions).subscribe(data => console.log(data));
  }
}
