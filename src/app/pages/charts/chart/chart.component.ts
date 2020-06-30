import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styles: [
  ]
})
export class ChartComponent implements OnInit {

  public graphics: any = {
    'chart1': {
      'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'title': 'El pan se come con'
    },
    'chart2': {
      'labels': ['Hombres', 'Mujeres'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'title': 'Entrevistados'
    },
    'chart3': {
      'labels': ['Si', 'No'],
      'data':  [95, 5],
      'type': 'doughnut',
      'title': '¿Le dan gases los frijoles?'
    },
    'chart4': {
      'labels': ['No', 'Si'],
      'data':  [85, 15],
      'type': 'doughnut',
      'title': '¿Le importa que le den gases?'
    },
  };
  constructor() { }

  ngOnInit(): void {
  }
}
