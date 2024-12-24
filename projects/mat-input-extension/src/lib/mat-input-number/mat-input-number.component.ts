import {Component, Input, input, OnInit, Optional, Self} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";

@Component({
  selector: 'mat-input-number',
  providers: [],
  template: `
    <input (keydown)="onInputChange($event)" matInput [value]="displayedValue"/>
  `,
  styles: ``
})
export class MatInputNumberComponent implements OnInit, ControlValueAccessor {
  _value!: number | null;
  displayedValue: string = '';
  numberPattern = /^[0-9]+$/;
  @Input()
  prefix: string = '';
  @Input()
  suffix: string = '';
  @Input()
  useDecimal: boolean = false;
  @Input()
  spacesAfterDot: number = 2;
  @Input()
  length: number = 0;
  onChange = (value: number | null) => {
  }
  onTouched = () => {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: number | null): void {
    this._value = obj;
    this.onChange(obj);
  }

  onInputChange(event: KeyboardEvent): void {
    console.log(event.key);
    const key = event.key;
    let value;
    if (this.numberPattern.test(key)) {
      this.displayedValue = this.displayedValue.concat(key);
    } else {
      event.preventDefault()
    }
    if (this.displayedValue !== '') {
      value = Number(this.displayedValue.split(this.numberPattern)[0])
    } else {
      value = null
    }
    this.writeValue(value);
  }

  formatDisplayedValue() {
    let value = `${this.prefix}`
  }

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if(this.useDecimal) {
      this.numberPattern = /^[0-9-\.]+$/;
    }else{
      //use common pattern ^\d*\.?\d*$
    }
  }
}
