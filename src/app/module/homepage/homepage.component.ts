import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Config } from 'protractor';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  config: { heroesUrl: any; textfile: any; };
  stateCityDict = {};
  state = [];
  cities = [];
  selectStateForm = new FormGroup({
    stateSelectOption: new FormControl()
  });
  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.getCities();
  }

  getCities() {
    this.globalService.getConfig('cities')
      .subscribe((data: {}) => {
        this.formatData(data);
      })
  }
  formatData(data) {
    var stateList = [];
    this.stateCityDict = {};
    for (let index in data) {
      this.stateCityDict[data[index]['State']] = []
      stateList.push(data[index]['State']);
    }
    for (let index in data) {
      this.stateCityDict[data[index]['State']].push(data[index]['City'])
    }
    this.state = stateList.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.selectStateForm.controls['stateSelectOption'].setValue(this.state[0]);
    this.optionChanged();
    // console.log(this.stateCityDict);
  }
  optionChanged() {
    var state = this.selectStateForm.get('stateSelectOption').value;
    this.cities = this.stateCityDict[state];
  }

}
