import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {Observable} from 'rxjs';
import {Pageable} from '../pagination/pageable';
import {Page} from '../pagination/page';
import {SortableColumn} from '../sorting/sortable-column';
import {LoginResponse} from '../models/LoginResponse';
import {IUpdateUser} from '../models/IUpdateUser';
import {ICheckPassword} from '../models/ICheckPassword';
import {VerifySecurityAnswer} from '../models/VerifySecurityAnswer';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


const API_URL = 'server/api/v1/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  isPassword: Observable<boolean>;

  public getPage(pageable: Pageable, sortableColumn: SortableColumn): Observable<Page<User>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers: headers};
    let url = API_URL
      + '?page=' + pageable.pageNumber
      + '&size=' + pageable.pageSize
      + this.getSortedParameters(sortableColumn);
    return this.http.get<Page<User>>(url, options);
  }

  public searchPage(pageable: Pageable, sortableColumn: SortableColumn, keyword: string): Observable<Page<User>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers: headers};
    let url = API_URL + 'search/' + keyword
      + '?page=' + pageable.pageNumber
      + '&size=' + pageable.pageSize
      + this.getSortedParameters(sortableColumn);
    // const body = JSON.stringify(keyword);
    return this.http.get<Page<User>>(url, options);
  }

  private getSortedParameters(sortableColumn: SortableColumn): string {
    if (sortableColumn == null) {
      return '&sort=id';
    }
    return '&sort=' + sortableColumn.name + ',' + sortableColumn.direction;
  }

  createUser(user): Observable<User> {
    const body = JSON.stringify(user);
    return this.http.post<User>(API_URL + 'add', body, httpOptions);
  }

  getOneUser(id: number): Observable<User> {
    // let token = localStorage.getItem('access_token');
    return this.http.get<User>('/api/v1/users/' + id);
    // {headers: new HttpHeaders().set('Authorization', 'Bearer' + token)}
  }

  deleteOneUser(id: number): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers};
    this.http.delete(API_URL + id, options).subscribe(data => console.log(data));
  }

  getSortedUsers(param: string): Observable<User[]> {
    return this.http.get<User[]>(API_URL + param);
  }

  updateUser(userUpdate: IUpdateUser): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers};
    const body = JSON.stringify(userUpdate);
    this.http.put(API_URL, body, options).subscribe(response => console.log(response));
  }

  getUserByUsername(username: string): Observable<User> {
    const token = sessionStorage.getItem('token');
    return this.http.get<User>(API_URL + 'get/' + username, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)});
  }


  checkPassword(checkPassword: ICheckPassword): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers};
    const body = JSON.stringify(checkPassword);
    return this.http.post<boolean>(API_URL + 'checkpw', body, options);

  }

  getAllUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers};
    return this.http.get<User[]>(API_URL + 'all', options);
  }

  verifyAnswer(verifySecurityAnswer: VerifySecurityAnswer, token: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    const options = {headers};
    const body = JSON.stringify(verifySecurityAnswer);
    return this.http.post<boolean>('server/api/v1/users/verifyanswer', body, options);
  }

  getUserByUsernameAsAdmin(username: string, token: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    const options = {headers};
    return this.http.get<User>('server/api/v1/users/get/' + username, options);
  }

  getDataAsAdmin(): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('my-trusted-client:secret')
    });
    const options = {headers};
    return this.http.post<LoginResponse>('http://localhost:8080/oauth/token?grant_type=password&username=admin&password=admin',
      null, options);
  }

  approveUser(userId: number): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers};
    return this.http.post<string>(API_URL + 'approve/' + userId, null, options);
  }
}

