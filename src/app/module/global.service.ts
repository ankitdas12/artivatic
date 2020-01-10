import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

  datasetApi = environment.api.datasetApi;
  mapsApi = environment.api.gmapApi;

  getConfig(option) {
    let url = this.datasetApi + option;
    return this.http.get(url);
  }
  getLatLong(option) {
    let url = this.mapsApi + option + "&key=" + environment.api.gmapKey;
    return this.http.get(url);
  }
}
