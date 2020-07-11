import {Injectable} from '@angular/core';

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
        {title: 'Promises', url: '/promises'},
        {title: 'Rxjs', url: '/rxjs'},
      ]
    },
    {
      title: 'Administration',
      icon: 'mdi mdi-folder-lock-open',
      subMenu: [
        {title: 'Users', url: '/users'},
        {title: 'Hospitals', url: '/hospitals'},
        {title: 'doctors', url: '/doctors'},
      ]
    }
  ];

  constructor() {
  }
}

export interface MenuItem {
  title: string;
  icon?: string;
  url?: string;
  subMenu?: MenuItem[];
}

