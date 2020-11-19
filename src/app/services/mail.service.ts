import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Mail} from '../models/Mail';

const API_URL = 'server/mail/';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) {
  }

  sendMail(mail: Mail): Observable<Mail> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers};
    const body = JSON.stringify(mail);
    return this.http.post<Mail>(API_URL, body, options);
  }

  resetPassword(mail: Mail, token: string): Observable<Mail> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    const options = {headers};
    const body = JSON.stringify(mail);
    return this.http.post<Mail>(API_URL + 'resetpassword', body, options);
  }

}
