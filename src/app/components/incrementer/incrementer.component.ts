import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

const MAX = 100;
const MIN = 0;
const STEP_DEFAULT = 5;

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: []
})
export class IncrementerComponent implements OnInit {
  @ViewChild('incrementerInput')
  public incrementerInput: ElementRef;

  @Input()
  public title: string = '';

  @Input()
  public value: number = 0;

  @Input()
  public step: number = STEP_DEFAULT;

  @Output()
  public onChangeValue: EventEmitter<number>

  constructor() {
    this.onChangeValue = new EventEmitter<number>();
  }

  ngOnInit(): void {
    this.step = this.step < MIN ? MIN : (this.step > MAX ? MAX : this.step);
  }

  public increase(): void {
    this.value += STEP_DEFAULT;
    this.normalizeValue();
    this.onChangeValue.emit(this.value);
  }

  public enabledIncrease(): boolean {
    return this.value < MAX;
  }

  public decrease(): void {
    this.value -= STEP_DEFAULT;
    this.normalizeValue();
    this.onChangeValue.emit(this.value);
  }

  public enabledDecrease(): boolean {
    return this.value > 0;
  }

  public handleChangeValue(newValue: number): void {
    this.value = newValue;
    this.normalizeValue();
    console.log(this.value);
    this.onChangeValue.emit(this.value);
    this.incrementerInput.nativeElement.value = this.value;
    this.incrementerInput.nativeElement.focus();
  }

  private normalizeValue(): void {
    if (this.value < MIN) {
      this.value = MIN;
    }
    if (this.value > MAX) {
      this.value = MAX;
    }
  }
}
