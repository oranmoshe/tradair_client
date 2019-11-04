import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ServerAPIService {

  constructor(private http: HttpClient) { }


  getCurrencies() {
    return this.http.get(environment.apiUrl + '/currencies').toPromise().then(res => {
      return Promise.resolve(res); })
      .catch(err => {
        return Promise.reject(err || 'Server error');
      });

  }

  getMock() {
    return this.http.get(environment.apiUrl + '/currencies/mock').toPromise().then(res => {
      return Promise.resolve(res); })
        .catch(err => {
          return Promise.reject(err || 'Server error');
        });
  }

}
