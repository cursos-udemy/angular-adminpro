import {Injectable} from '@angular/core';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _menu: MenuItem[];

  constructor(private userService: UserService) {
    this.loadMenu();
  }

  public loadMenu(): void {
    this._menu = this.userService.menu;
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

