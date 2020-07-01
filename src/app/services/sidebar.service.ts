import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: MenuItem[] = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      subMenu: [
        {title: 'Dashboard', url: '/dashboard'},
        {title: 'Progress', url: '/progress'},
        {title: 'Chart', url: '/chart'},
      ]
    }
  ];

  constructor() { }
}

export interface MenuItem {
  title: string;
  icon?: string;
  url?: string;
  subMenu?: MenuItem[];
}

