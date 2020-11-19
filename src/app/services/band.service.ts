import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Band} from '../models/Band';
import {Pageable} from '../pagination/pageable';
import {SortableColumn} from '../sorting/sortable-column';
import {Page} from '../pagination/page';
import {User} from '../models/User';


const API_URL = 'server/api/v1/bands/';

@Injectable({
  providedIn: 'root'
})
export class BandService {

  constructor(private http: HttpClient) {
  }

  createBand(band: Band): Observable<Band> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers: headers};
    const body = JSON.stringify(band);
    return this.http.post<Band>(API_URL, body, options);

  }

  addBandMember(bandId: number, memberId: number): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers: headers};
    return this.http.post<string>(API_URL + bandId + '/' + memberId, null, options);
  }
  addBand(bandId: number): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers: headers};
    this.http.delete(API_URL + bandId, options);
  }

  deleteBand(bandId: number): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers: headers};
    this.http.delete(API_URL + bandId, options).subscribe(data => console.log(data));
  }
  getBandById(bandId: number): Observable<Band> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers: headers};
    return this.http.get<Band>(API_URL + bandId, options);
  }
  getBandPage(pageable: Pageable, sortableColumn: SortableColumn): Observable<Page<Band>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers: headers};
    let url = API_URL
      + '?page=' + pageable.pageNumber
      + '&size=' + pageable.pageSize
      + this.getSortedParameters(sortableColumn);
    return this.http.get<Page<Band>>(url, options);
  }
  private getSortedParameters(sortableColumn: SortableColumn): string {
    if (sortableColumn == null) {
      return '&sort=id';
    }
    return '&sort=' + sortableColumn.name + ',' + sortableColumn.direction;
  }

  searchPage(pageable: Pageable, column: SortableColumn, keyword: string): Observable<Page<Band>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers: headers};
    let url = API_URL + 'search/' + keyword
      + '?page=' + pageable.pageNumber
      + '&size=' + pageable.pageSize
      + this.getSortedParameters(column);
    return this.http.get<Page<Band>>(url, options);
  }
  getSoerenBands(): Observable<Band[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const options = {headers: headers};
    return this.http.get<Band[]>(API_URL + 'isSoeren', options);
  }
}

