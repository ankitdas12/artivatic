import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

  configUrl = 'https://indian-cities-api-nocbegfhqg.now.sh/';

  getConfig(option) {
    let url = this.configUrl + option;
    return this.http.get(url);
  }
}
