import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IInstrument} from '../models/iinstrument';

const API_URL = 'server/api/v1/instruments';

@Injectable({
  providedIn: 'root'
})
export class InstrumentsService {

  constructor(private http: HttpClient) {
  }


  getAllInstruments(): Observable<IInstrument[]> {
    return this.http.get<IInstrument[]>(API_URL, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' +
        sessionStorage.getItem('token'))
    });

  }
}
