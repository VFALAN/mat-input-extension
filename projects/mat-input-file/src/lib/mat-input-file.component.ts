import {Component, ElementRef, HostBinding, Inject, Input, OnDestroy, Optional, Self, ViewChild} from '@angular/core';
import {MatFormField, MatInput, MatInputModule} from "@angular/material/input";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {MAT_FORM_FIELD, MatFormFieldControl, MatFormFieldModule} from "@angular/material/form-field";
import {Subject} from "rxjs";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {BooleanInput, coerceBooleanProperty} from "@angular/cdk/coercion";
import {MatIconButton} from "@angular/material/button";


@Component({
  selector: 'mat-input-file',
  standalone: true,
  providers: [{provide: MatFormFieldControl, useExisting: MatInputFileComponent}],
  imports: [
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    CommonModule,
    MatIconButton
  ],
  template: `


    <input #fileName
           disabled="true"
           type="text"
           placeholder="select a file"
           class="mat-input-file"
           [value]="_value?.name"
           matInput
    >

    <div class="button-container">
      @if (_value?.name !== null) {
        <button class="suffix-button" mat-icon-button (click)="value=null;empty=true" matSuffix>
          <mat-icon>close</mat-icon>
        </button>

      } @else {
        <button class="suffix-button" mat-icon-button matSuffix (click)="fileInput.click();this.focused=true">
          <mat-icon>attach_file</mat-icon>
        </button>
      }
    </div>
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

    .suffix-button {
      display: inline-block !important;
    }

    .button-container {
      position: absolute;
      top: 50%;
      right: 10%;
      transform: translateY(-50%);
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
    this.onTouched()
    this.onChange(value);

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
    console.log('writing value')
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
  readonly errorState!: boolean;
  focused: boolean = false;

  onFocusIn(event: FocusEvent) {
    console.log('on focus', event);
    this.focused = true;
    this.stateChanges.next();
  }

  OnFocusOut(event: FocusEvent) {
    console.log('out focus', event);
    if (this.input.nativeElement.contains(event.relatedTarget)) {
      this.focused = true;
      this.onTouched();
    }
  }


  onContainerClick(event: MouseEvent): void {
    console.log('onContainerClick in mat-file input', event);
    if ((event.target as Element).tagName.toLowerCase() === 'input') {
      console.log('setting float')
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
    // console.log('should float', this.focused, !this.empty)
    return this.focused || !this.empty;
  }

  stateChanges = new Subject<void>();

  @Input('aria-describedby') userAriaDescribedBy!: string;

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  constructor(@Optional() @Self() public ngControl: NgControl,
              @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }
}
