import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {
    this.countTo(3)
      .then(value => console.log(`Exit with value: ${value}`))
      .catch(console.warn);
  }

  ngOnInit(): void {
  }

  private countTo(value: number): Promise<number> {
    return new Promise((resolve, reject) => {
      let counter = 0;
      let interval = setInterval(() => {
        counter++;
        console.log('counter: ', counter);
        if (counter >= value) {
          resolve(counter);
          clearInterval(interval);
        }
      }, 1000);
    });
  }
}
