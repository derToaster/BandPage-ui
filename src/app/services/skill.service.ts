import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ISkillLevels} from '../models/ISkillLevels';
import {IUser} from '../models/IUser';

const API_URL = 'server/api/v1/skill/';


@Injectable({
  providedIn: 'root'
})
export class SkillService {


  constructor(private http: HttpClient) {
  }

  createSkill(instrumentId: number, userId: number, skillLevelId: number): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers: headers};
    const param = {
      'instrumentId': instrumentId,
      'userId': userId,
      'skillLevelId': skillLevelId
    };
    const body = JSON.stringify(param);
    console.log(options);

    this.http.post(API_URL, body, options).subscribe(response => console.log(response));
  }

  getSkillLevels(): Observable<ISkillLevels[]> {
    return this.http.get<ISkillLevels[]>(API_URL, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))});
  }

  deleteSkill(id: number): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers: headers};
    this.http.delete(API_URL + id, options).subscribe(data => console.log(data + 'deleted'));
  }
}
