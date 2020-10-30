import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoginResponse} from '../models/LoginResponse';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Resolve} from '@angular/router';


const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': 'Basic ' + btoa('my-trusted-client:secret')
});
const options = {headers: headers};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  loginstatus = new BehaviorSubject<boolean>(false);

  authenticate(username: string, password: string): Promise<boolean> {
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
}
