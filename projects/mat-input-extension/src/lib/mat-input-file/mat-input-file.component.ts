import {Component, ElementRef, HostBinding, Inject, Input, OnDestroy, Optional, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {MAT_FORM_FIELD, MatFormFieldControl} from "@angular/material/form-field";
import {MatFormField, MatInput} from "@angular/material/input";
import {BooleanInput, coerceBooleanProperty} from "@angular/cdk/coercion";
import {Subject} from "rxjs";

@Component({
  selector: 'lib-mat-input-file',
  templateUrl: './mat-input-file.component.html',
  styleUrl: './mat-input-file.component.css'
})
export class MatInputFileComponent implements OnDestroy, ControlValueAccessor, MatFormFieldControl<File> {
  static nextId = 0;
  @ViewChild(MatInput, {read: ElementRef, static: true})
  input!: ElementRef;
  @ViewChild('fileName')
  fileName!: ElementRef;
  @HostBinding()
  id: string = `mat-file-input-${MatInputFileComponent.nextId++}`
  //value
  _value!: File | null;
  set value(value: File | null) {
    this._value = value;
    this.onTouched()
    this.onChange(value);

    this.stateChanges.next();
  }

  _touched: boolean = false;

  get value(): File | null {
    return this._value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }


  writeValue(obj: any): void {

    this.value = obj;
    this.stateChanges.next();
  }

  fileSelected(file: FileList | null): void {
    if (file !== null) {
      this.value = file[0];
      this.empty = false;
      this.writeValue(this.value)
    } else {
      this.empty = true;
      this.value = null;
      this.writeValue(null);
    }


    this.stateChanges.next();
  }

  @Input()
  set autofilled(value: boolean) {
    this._autofilled = value;
  }

  _autofilled!: boolean | undefined;

  get autofilled(): boolean | undefined {
    return this._autofilled;
  }

  controlType: string | undefined = 'mat-input-file';
  _disabled: boolean = false;
  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
    this.stateChanges.next();
  }

  get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  set empty(value: boolean) {
    this._empty = value;
  }

  get empty(): boolean {
    return this._empty;
  }

  _empty: boolean = true;

  get errorState(): boolean {
    return this._value === null && this._touched;
  }

  focused: boolean = false;

  onFocusIn(event: FocusEvent) {

    this.focused = true;
    this.stateChanges.next();
  }

  OnFocusOut(event: FocusEvent) {

    if (this.input.nativeElement.contains(event.relatedTarget)) {
      this.focused = true;
      this.onTouched();
    }
  }


  onContainerClick(event: MouseEvent): void {

    this._touched = true;
    if ((event.target as Element).tagName.toLowerCase() === 'input') {

      this.stateChanges.next();
      this.focused = true
    }
    this.focused = false;
  }

  private _placeholder!: string;
  @Input()
  set placeholder(value: string) {
    this._placeholder = value;
  }

  get placeholder(): string {
    return this._placeholder;
  }

  private _required: boolean = false;
  @Input()
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  get required(): boolean {
    return this._required;
  }

  setDescribedByIds(ids: string[]): void {
    const controlElement = this.input.nativeElement
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onChange = (value: File | null) => {
  }
  onTouched = () => {
  };


  @HostBinding('class.floating')
  get shouldLabelFloat() {

    return this.focused || !this.empty;
  }

  stateChanges = new Subject<void>();

  @Input('aria-describedby') userAriaDescribedBy!: string;

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  constructor(@Optional() @Self() public ngControl: NgControl,
              @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }
}
