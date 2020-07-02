import {Component, OnInit} from '@angular/core';
import {ActivationEnd, Data, Router} from "@angular/router";
import {filter, map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: []
})
export class BreadcrumbComponent implements OnInit {

  public title: string = '';

  constructor(
    private router: Router,
    private titleService: Title,
    private metaService: Meta) {
    this.getPageTitleFromRoute().subscribe(data => {
      this.title = data.title;
      this.titleService.setTitle(this.title);

      this.metaService.updateTag({
        name: 'description',
        content: 'uds esta en la pagina ' + this.title
      });
    });
  }

  ngOnInit(): void {
  }

  private getPageTitleFromRoute(): Observable<Data> {
    return this.router.events
      .pipe(
        filter<ActivationEnd>(event => event instanceof ActivationEnd),
        filter<ActivationEnd>(event => event.snapshot.firstChild === null),
        map(event => event.snapshot.data)
      )
  }
}
