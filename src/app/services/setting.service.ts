import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";

const APP_SETTING: string = 'APP-USER-SETTING';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  public config: AppSetting;

  constructor(@Inject(DOCUMENT) private _document: Document) {
    this.config = {
      theme: 'default-dark'
    }
    this.readSetting();
  }

  public saveSetting() {
    localStorage.setItem(APP_SETTING, JSON.stringify(this.config));
  }

  public readSetting() {
    const item = localStorage.getItem(APP_SETTING);
    if (item) this.config = JSON.parse(item);
    this.applyTheme(this.config.theme);
  }

  public applyTheme(theme: string): void {
    const element = this._document.getElementById('theme-layout');
    const url = `assets/css/colors/${theme}.css`;
    element.setAttribute('href', url);
    this.config.theme = theme;
    this.saveSetting();
  }
}

export interface AppSetting {
  theme: string;
}
