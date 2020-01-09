import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {
  showTable:boolean = false
  showChart:boolean = false
  constructor() { }

  ngOnInit() {
  }
  showGrid(){
    this.showTable = true;
  }
  hideGrid(){
    this.showTable = false;
  }
  showCharts(){
    this.showChart = true;
  }
  hideCharts(){
    this.showChart = false;
  }

}
