import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {IUser} from '../models/IUser';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Pageable} from '../pagination/pageable';
import {Page} from '../pagination/page';
import {SortableColumn} from '../sorting/sortable-column';
import {LoginResponse} from '../models/LoginResponse';
import {IUpdateUser} from '../models/IUpdateUser';
import {ICheckPassword} from '../models/ICheckPassword';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


const API_URL = 'server/api/v1/users/';

@Injectable({
  providedIn: 'root'
})
export class BandService {
  constructor(private http: HttpClient) {
  }

  isPassword: Observable<boolean>;

  public getPage(pageable: Pageable, sortableColumn: SortableColumn): Observable<Page<IUser>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers: headers};
    let url = API_URL
      + '?page=' + pageable.pageNumber
      + '&size=' + pageable.pageSize
      + this.getSortedParameters(sortableColumn);
    return this.http.get<Page<IUser>>(url, options);
  }

  private getSortedParameters(sortableColumn: SortableColumn): string {
    if (sortableColumn == null) {
      return '&sort=id';
    }
    return '&sort=' + sortableColumn.name + ',' + sortableColumn.direction;
  }

  createUser(user): Observable<IUser> {
    const body = JSON.stringify(user);
    return this.http.post<IUser>(API_URL + 'add', body, httpOptions);
  }

  getOneUser(id: number): Observable<IUser> {
    // let token = localStorage.getItem('access_token');
    return this.http.get<IUser>('/api/v1/users/' + id);
    // {headers: new HttpHeaders().set('Authorization', 'Bearer' + token)}
  }

  deleteOneUser(id: number): void {
    this.http.delete(API_URL + id, httpOptions).subscribe(data => console.log(data));
  }

  getSortedUsers(param: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(API_URL + param);
  }

  updateUser(userUpdate: IUpdateUser): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers: headers};
    const body = JSON.stringify(userUpdate);
    this.http.put(API_URL, body, options).subscribe(response => console.log(response));
  }

  getUserByUsername(username: string): Observable<IUser> {
    const token = sessionStorage.getItem('token');
    return this.http.get<IUser>(API_URL + 'get/' + username, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)});
  }


  checkPassword(checkPassword: ICheckPassword): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers: headers};
    const body = JSON.stringify(checkPassword);
    return this.http.post<boolean>(API_URL + 'checkpw', body, options);

  }
}

