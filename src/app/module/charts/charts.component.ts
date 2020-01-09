import { AfterViewInit, Component, ElementRef, ViewChild,OnInit } from '@angular/core';
import * as dataset from "../../../assets/JSON/dataset.json";
declare var google: any;

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements AfterViewInit {
  @ViewChild('lineChart',{static: true}) lineChart: ElementRef
  constructor() { }
  drawChart = () => {
      var refData = this.refineData(dataset['default']['dataset']);
      const data = google.visualization.arrayToDataTable(refData);
    
      const options = {
        title: 'Frequency of Cities',
        legend: {position: 'bottom'}
      };
    
      const chart = new google.visualization.LineChart(this.lineChart.nativeElement);
    
      chart.draw(data, options);
    }

  // ngOnInit() {
  // }
  ngAfterViewInit() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }
  refineData(dataset){
    var response = [];
    response.push(['City', 'Frequency']);
    let innerList = {}
    for(let row in dataset){
      innerList[dataset[row]['city']] = 0;
    }
    for(let row in dataset){
      innerList[dataset[row]['city']] = innerList[dataset[row]['city']] + 1;
    }
    for(let row in innerList){
      response.push([row,innerList[row]]);
    }
    return response;
  }
}
