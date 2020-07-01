import { Component, OnInit } from '@angular/core';

declare function initPlugins();

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [
  ]
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    initPlugins();
  }

}
