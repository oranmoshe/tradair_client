import {ServerAPIService} from '../services/server-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import {CurrencyValue} from '../models/currency-value';
import { CookieService } from 'ngx-cookie-service';
import {ResizedEvent} from 'angular-resize-event';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [{}];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public widgetHeight = '200';
  public widgetWidth = '200';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private serverAPIService: ServerAPIService, private cookieService: CookieService) { }

  ngOnInit() {
    this.updateWidgetSize();
    this.updateChartData();
  }

  updateChartData() {
    this.serverAPIService.getCurrencies().then(res => {
        this.dataToChart(res);
        this.chart.updateColors();
      },
      error =>  {
        console.error('An error occurred in retrieving rx list, navigating to login: ', error);
      });
  }

  updateWidgetSize() {
    if (!this.cookieService.check('widget_width')) {
      this.cookieService.set('widget_width', '400');
      this.cookieService.set('widget_height', '400');
    }
    this.widgetHeight = this.cookieService.get('widget_height');
    this.widgetWidth = this.cookieService.get('widget_width');
  }

  dataToChart(data) {
    const chartDates = new Set();
    const currencyToValue = new Map();
    this.lineChartLabels = [];
    for (const entry of (data as CurrencyValue[])) {
      if (!chartDates.has(entry.time_created)) {
        chartDates.add(entry.time_created);
        this.lineChartLabels.push(new Date(entry.time_created).toDateString().toString());
      }
      if (currencyToValue.has(entry.name)) {
        currencyToValue.get(entry.name).push(entry.rate);
      } else {
        currencyToValue.set(entry.name, [entry.rate]);
      }
    }
    const allSets = [];
    currencyToValue.forEach((value: boolean, key: string) => {
      console.log(key, value);
      const sets = {label: key, data: value};
      allSets.push(sets);
    });
    this.lineChartData = allSets;
  }

  onResized(event: ResizedEvent) {
    this.cookieService.set('widget_width', (event.newWidth + 2).toString());
    this.cookieService.set('widget_height', (event.newHeight + 2).toString());
    console.log(this.cookieService.getAll());
  }
}
