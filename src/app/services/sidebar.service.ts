import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _menu: MenuItem[];

  constructor(private authService: AuthService) {
    this.loadMenu();
  }

  public loadMenu(): void {
    this._menu = this.authService.menu;
  }

  get menu(): MenuItem[] {
    return this._menu;
  }
}

export interface MenuItem {
  title: string;
  icon?: string;
  url?: string;
  subMenu?: MenuItem[];
}

