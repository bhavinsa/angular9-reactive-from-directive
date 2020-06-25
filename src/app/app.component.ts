import { Component, OnInit } from '@angular/core';
const moment = require('moment');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'assignment';
  startDate = moment();
  // estimationInHours = 100;
  estimationHoursArr = [8,4,10];
  estimation: any = [];
  estimationInHours: number;
  ngOnInit() {
    console.log(this.startDate);
    this.estimationInHours = this.estimationHoursArr.reduce((a, b) => a + b, 0);
    const estimationInDays = this.estimationInHours / 8;
    const estimationInMinutes = this.estimationInHours * 60;
    let remainHours = 0;
    let currentDate = this.startDate;

    this.estimationHoursArr.forEach((workData) => {
      if (workData === 8 && remainHours === 0) {
        this.addEstimation(workData, remainHours, currentDate, currentDate);
        currentDate = moment(currentDate).add(1, 'days');
      } else if (workData < 8 && remainHours === 0) {
        remainHours = 8 - workData;
        this.addEstimation(workData, remainHours, currentDate, currentDate);
      } else if (workData < 8 && remainHours !== 0) {
        const endDate = moment(currentDate).add(1, 'days');
        currentDate = endDate;
        remainHours = 8 - (workData - remainHours);
        this.addEstimation(workData, remainHours, currentDate, endDate);
      } else if (workData > 8 && remainHours === 0) {
        const days: number = workData / 8;
        const endDate = moment(currentDate).add(Math.floor(days), 'days');
        remainHours = (workData - remainHours) - 8;
        this.addEstimation(workData, remainHours, currentDate, endDate);
      } else if (workData > 8 && remainHours !== 0) {
        const days: number = (workData + remainHours) / 8;
        const endDate = moment(currentDate).add(Math.floor(days), 'days');
        remainHours = (workData - remainHours) - 8;
        this.addEstimation(workData, remainHours, currentDate, endDate);
      }


    });
    console.log(this.estimation);
  }

  addEstimation(workData, remainHours, currentDate, endDate) {
    this.estimation.push({
      hours: workData,
      remainHours,
      startDate: moment(currentDate).format('DD-MM-YYYY'),
      endDate: moment(endDate).format('DD-MM-YYYY')
    });
    return true;
  }
}
