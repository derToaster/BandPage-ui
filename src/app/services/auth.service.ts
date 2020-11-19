import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoginResponse} from '../models/LoginResponse';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const API_URL = 'server/api/v1/users/';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  isAdmin = new BehaviorSubject<boolean>(false);
  loginstatus = new BehaviorSubject<boolean>(false);

  authenticate(username: string, password: string): Promise<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('my-trusted-client:secret')
    });
    const options = {headers: headers};
    return new Promise<boolean>((resolve, reject) => {
      this.http.post<LoginResponse>('http://localhost:8080/oauth/token?grant_type=password&username=' + username
        + '&password=' + password, null, options).subscribe(data => {
        sessionStorage.setItem('token', data.access_token);
        sessionStorage.setItem('verToken', data.access_token);
        sessionStorage.setItem('username', username);
        if (sessionStorage.getItem('token') !== sessionStorage.getItem('verToken')) {
          this.loginstatus.next(false);
          reject('Auth failed');
        } else {
          this.loginstatus.next(true);
          resolve();
        }
      });
    });
  }

  getLoginstatus(): Observable<boolean> {
    return this.loginstatus.asObservable();
  }

  isUserAdmin(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      });
      const options = {headers};
      this.http.get(API_URL + 'isAdmin/' + sessionStorage.getItem('username'), options).subscribe(response => {
        if (!response) {
          this.isAdmin.next(false);
          reject('this user is not an Admin');
        } else {
          this.isAdmin.next(true);
          resolve();
        }
      });
    });
  }
  getIsAdmin(): Observable<boolean> {
    return this.isAdmin.asObservable();
  }
}
