import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BandMembership} from '../models/band-membership';
import {Observable} from 'rxjs';

const API_URL = 'server/api/v1/members/';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private http: HttpClient) {
  }

  createMembership(memberId: number, bandId: number): Observable<BandMembership> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers};
    const param = {
      'memberId': memberId,
      'bandId': bandId
    };
    const body = JSON.stringify(param);
    return this.http.post<BandMembership>(API_URL, body, options);
  }

  deleteMembership(membershipId: number): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers};
    this.http.delete(API_URL + membershipId, options).subscribe(data => console.log(data));
  }

  getMembersOfBand(bandId: number): Observable<BandMembership[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers};
    return this.http.get<BandMembership[]>(API_URL + bandId + '/bandmembers', options);
  }
}
