import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class BandService {
  constructor(private http: HttpClient) { }

  getUsers(): any{
    // let token = localStorage.getItem('access_token');
    return this.http.get('/server/api/v1/users',
    // {headers: new HttpHeaders().set('Authorization', 'Bearer' + token)}
  );
  }
  createUser(user): any{
    const body = JSON.stringify(user);
    return this.http.post('/server/api/v1/users', body, httpOptions);
  }
  getOneUser(id: number): any{
    // let token = localStorage.getItem('access_token');
    return this.http.get('/server/api/v1/users' + id,
      // {headers: new HttpHeaders().set('Authorization', 'Bearer' + token)}
    );
  }
  deleteOneUser(id: number): void{
    this.http.delete('/server/api/v1/users' + id);
  }
}
