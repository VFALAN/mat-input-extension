import {Component, ElementRef, HostBinding, Input, OnDestroy, Optional, Self, ViewChild} from '@angular/core';
import {MatInput, MatInputModule} from "@angular/material/input";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {MatFormFieldControl} from "@angular/material/form-field";
import {Subject} from "rxjs";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";


@Component({
  selector: 'mat-input-file',
  standalone: true,
  providers: [{provide: MatFormFieldControl, useExisting: MatInputFileComponent}],
  imports: [
    MatInputModule,
    MatIconModule,
    CommonModule
  ],
  template: `
    <input #fileName type="text" (click)="fileInput.click()" [value]="_value?.name" matInput>
    <mat-icon matSuffix>file</mat-icon>
    <input #fileInput hidden type="file" (change)="fileSelected(fileInput.files)">
  `,
  styles: `
    span {
      opacity: 0;
      transition: opacity 200ms;
    }

    :host.floating span {
      opacity: 1;
    }
  `
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
    this.stateChanges.next();
  }

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

  fileSelected(file: any | null): void {
    this._value = file[0];
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

  readonly controlType!: string | undefined;
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
  readonly errorState!: boolean;
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
  set required(value: boolean) {
    this._required = value;
    this.stateChanges.next();
  }

  get required(): boolean {
    return this._required;
  }

  setDescribedByIds(ids: string[]): void {
  }

  onChange = (value: File | undefined) => {
  }
  onTouched = () => {
  };


  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  readonly stateChanges = new Subject<void>();
  readonly userAriaDescribedBy!: string;

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }
}
