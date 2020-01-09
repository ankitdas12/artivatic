// import { } from 'googlemaps';
/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import * as dataset from "../../../assets/JSON/dataset.json";

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss']
})
export class GmapComponent implements OnInit {
  @ViewChild('gmap', { static: true }) gmapElement: any;
  map: google.maps.Map;
  iconBase = dataset['iconBase'];

  icons = {
    icon: this.iconBase + dataset['markerName']
  };
  constructor() { }

  ngOnInit() {
    var geocoder = new google.maps.Geocoder();
    // var result = {};
    geocoder.geocode({ 'address': "Abhayapuri"}, function (results, status) {
      var result = {};
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results);
        // result['lat'] = results[0].geometry.location.Pa;
        // result['lng'] = results[0].geometry.location.Qa;
      } else {
        result = "Unable to find address: " + status;
      }
      // storeResult(result);
    });

    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    for (let val in dataset['default']['dataset']) {
      var dataRow = dataset['default']['dataset'][val];
      this.setCenter(dataRow);
    }
  }
  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId);
  }
  setCenter(dataRow) {
    var latitude = dataRow['latitude'];
    var longitude = dataRow['longitude'];
    var myLatLng = new google.maps.LatLng(latitude, longitude);
    this.setMarker(myLatLng, dataRow);
    this.map.setCenter(new google.maps.LatLng(latitude, longitude));
  }
  setMarker(myLatLng, dataRow) {
    var city = dataRow['city'];
    var owner_type_code = dataRow['owner_type_code'];
    var cards_accepted = dataRow['cards_accepted'];
    var geocode_status = dataRow['geocode_status'];
    var fuel_type_code = dataRow['fuel_type_code'];

    var contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading">' + city + '</h1>' +
      '<div id="bodyContent">' +
      '<p><b>Owner Type Code</b>:' + owner_type_code +
      '<p><b>Cards Accepted</b>:' + cards_accepted +
      '<p><b>Geocode Status</b>:' + geocode_status +
      '<p><b>Fuel Type Code</b>:' + fuel_type_code +
      '</div>' +
      '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      icon: this.icons.icon,
      map: this.map,
      title: city
    });
    marker['id'] = dataRow['id'];

    // marker.addListener('click', () => {
    //   var allData = this.getDataFromTitle(marker['title'],marker['id']);
    // });

    marker.addListener('mouseover', () => {
      infowindow.open(this.map, marker);
    });
    marker.addListener('mouseout', () => {
      infowindow.close();
    });
  }
  // getDataFromTitle(title,id){
  //   var allData = {};
  //   for(let val in dataset['default']['dataset']){
  //     var dataRow = dataset['default']['dataset'][val];
  //     if(dataRow['city'] == title && dataRow['id'] == id){
  //       allData = dataRow;
  //       break;
  //     }
  //   }
  //   return allData;
  // }
}


