import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IUser} from '../models/IUser';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class BandService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]>{
    // let token = localStorage.getItem('access_token');
    return this.http.get<IUser[]>('/server/api/v1/users',
    // {headers: new HttpHeaders().set('Authorization', 'Bearer' + token)}
  );
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
