import {Component, OnInit} from '@angular/core';
import {SettingService} from "./services/setting.service";

declare function initPlugins();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  title = 'adminpro';

  constructor(private settingService: SettingService) {
  }

  ngOnInit() {
    initPlugins();
  }
}
