// import { } from 'googlemaps';
/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, Input, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import * as dataset from "../../../assets/JSON/dataset.json";
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GmapComponent implements OnInit, OnChanges {
  @ViewChild('gmap', { static: true }) gmapElement: any;
  @Input('') data;
  map: google.maps.Map;
  iconBase = dataset['iconBase'];

  icons = {
    icon: this.iconBase + dataset['markerName']
  };
  constructor(private globalService: GlobalService) { }
  ngOnChanges(changes: SimpleChanges) {
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.getLatLong(this.data);
  }
  ngOnInit() {

    // var mapProp = {
    //   center: new google.maps.LatLng(18.5793, 73.8143),
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }
  getLatLong(data) {
    var requestDict = {}
    requestDict['action'] = "get";
    requestDict['data'] = data;
    for (let index in data) {
      this.getCities(data[index])
    }
  }
  getCities(index) {
    this.globalService.getLatLong(index)
      .subscribe((data: {}) => {
        this.formatList(data)
      })
  }
  formatList(data) {
    let latLongList = [];
    for (let index in data['results']) {
      latLongList.push(data['results'][index]['geometry']['location']);
      this.setCenter((data['results'][index]['geometry']['location']));
    }
  }
  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId);
  }
  setCenter(dataRow) {
    var latitude = dataRow['lat'];
    var longitude = dataRow['lng'];
    var myLatLng = new google.maps.LatLng(latitude, longitude);
    this.setMarker(myLatLng, dataRow);
    this.map.setCenter(new google.maps.LatLng(latitude, longitude));
  }
  setMarker(myLatLng, dataRow) {

    var marker = new google.maps.Marker({
      position: myLatLng,
      // icon: this.icons.icon,
      map: this.map
    });
    marker['id'] = dataRow['id'];

  }
}


