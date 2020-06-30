import { Component, OnInit } from '@angular/core';
const MAX = 100;
const MIN = 0;
const STEP = 5;

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: [
  ]
})
export class ProgressComponent implements OnInit {

  public percentage: number = 89;
  public percentage2: number = 23;

  constructor() { }

  ngOnInit(): void {
  }

  public handleChangeValue(event: number): void {
    this.percentage = event;
  }



}
