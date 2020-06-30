import {Component, Input, OnInit} from '@angular/core';
import {Label, MultiDataSet} from "ng2-charts";
import {ChartType} from "chart.js";

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donuts-chart.component.html',
  styles: []
})
export class DonutsChartComponent implements OnInit {

  @Input()
  public labels: Label[] = [];

  @Input()
  public data: MultiDataSet = [];

  @Input()
  public title: string;

  public doughnutChartType: ChartType = 'doughnut';

  constructor() {
  }

  ngOnInit() {
  }

  // events
  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
