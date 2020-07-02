import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {retry, map, filter} from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  private oddSubscription: Subscription;

  constructor() {
  }

  ngOnInit(): void {
    this.countTo(4)
      .pipe(
        // ante la ocurrencia de un error, vuelve a intentar 2 veces mas
        retry(2)
      )
      .subscribe(
        value => console.log('countTo.value: ', value),
        err => console.error('countTo.error: ', err),
        () => console.log('Termino de ejecutarse el observador countTo')
      );

    this.adder(4)
      .subscribe(
        value => console.log('adder.value: ', value),
        err => console.error('adder.error: ', err),
        () => console.log('Termino de ejecutarse el observador adder')
      );

    this.oddSubscription = this.oddTo(10)
      .subscribe(
        value => console.log('oddTo.value: ', value),
        err => console.error('oddTo.error: ', err),
        () => console.log('Termino de ejecutarse el observador oddTo')
      );
  }

  ngOnDestroy() {
    console.log('destroy page rxjs');
    if (this.oddSubscription) {
      console.log('unsubscribe odd');
      this.oddSubscription.unsubscribe();
    }
  }

  private countTo(value: number): Observable<number> {
    return new Observable(observer => {
      let counter = 0;
      let interval = setInterval(() => {
        counter++;
        observer.next(counter);
        if (counter >= value) {
          clearInterval(interval);
          observer.complete();
        } else if (counter == 2) {
          //clearInterval(interval);
          observer.error('Es un numero 2!')
        }
      }, 1000);
    });
  }

  private adder(value: number): Observable<number> {
    return new Observable<any>(observer => {
      let counter = 0;
      let interval = setInterval(() => {
        counter++;
        observer.next({status: 'ok', value: counter});
        if (counter >= value) {
          clearInterval(interval);
          observer.complete();
        }
      }, 1000);
    }).pipe(map(data => data.value));
  }

  private oddTo(value: number): Observable<number> {
    return new Observable<number>(observer => {
      let counter = 0;
      setInterval(() => {
        counter++;
        observer.next(counter);
      }, 1000);
    }).pipe(filter(v => v % 2 === 1));
  }

}
