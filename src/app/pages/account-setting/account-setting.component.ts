import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {SettingService} from "../../services/setting.service";

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: ['#themecolors a {cursor: pointer}']
})
export class AccountSettingComponent implements OnInit {

  constructor(private settingService: SettingService) {
  }

  ngOnInit(): void {
    this.selectThemeFromSetting();
  }

  public changeTheme(theme: string, linkReference: any): void {
    this.settingService.applyTheme(theme);
    this.removeAllChecks()
    this.applyCheckToSelectedTheme(linkReference);
  }

  private removeAllChecks() {
    const selectors: any = document.getElementsByClassName('selector');
    for (let ref of selectors) {
      ref.classList.remove('working');
    }
  }

  private applyCheckToSelectedTheme(linkReference: any) {
    linkReference.classList.add('working');
  }

  public selectThemeFromSetting(): void {
    const theme = this.settingService.config.theme;
    const selectors: any = document.getElementsByClassName('selector');
    for (let ref of selectors) {
      if (theme === ref.getAttribute('data-theme')) {
        this.applyCheckToSelectedTheme(ref);
        return;
      }
    }
  }
}
