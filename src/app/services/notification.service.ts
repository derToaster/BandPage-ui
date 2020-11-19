import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Notifications} from '../models/Notifications';
import {Observable} from 'rxjs';

const API_URL = 'server/api/v1/notifications/';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {
  }

  createNotification(notifications: Notifications): Observable<Notifications> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers: headers};
    const body = JSON.stringify(notifications);
    return this.http.post<Notifications>(API_URL, body, options);
  }

  deleteNotification(notificationId: number): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers: headers};
    this.http.delete(API_URL + notificationId, options).subscribe(data => console.log(data));
  }
}
