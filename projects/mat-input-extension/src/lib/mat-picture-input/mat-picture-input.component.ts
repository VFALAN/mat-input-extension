import {
  Component,
  ElementRef,
  HostBinding,
  Inject,
  inject,
  Input,
  OnInit,
  Optional,
  Self,
  ViewChild
} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PictureUiComponent} from "../picture-ui/picture-ui.component";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {Subject} from "rxjs";
import {MatFormField, MatInput} from "@angular/material/input";
import {BooleanInput, coerceBooleanProperty} from "@angular/cdk/coercion";
import {MAT_FORM_FIELD, MatFormFieldControl} from "@angular/material/form-field";
import {PicturePreViewComponent} from "../picture-pre-view/picture-pre-view.component";

@Component({
  selector: 'mat-picture-input',
  standalone: false,
  providers: [{provide: MatFormFieldControl, useExisting: MatPictureInputComponent}],
  templateUrl: './mat-picture-input.component.html',
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
export class MatPictureInputComponent implements OnInit, ControlValueAccessor {
  @Input()
  enabledPreview: boolean = false;
  @Input()
  enabledDownload: boolean = false;
  readonly dialog = inject(MatDialog);
  private _value: File | null = null;
  static nextId = 0;
  @ViewChild(MatInput, {read: ElementRef, static: true})
  input!: ElementRef;
  @HostBinding()
  id: string = `mat-picture-input-${MatPictureInputComponent.nextId++}`
  private preViewData!: string;

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;

    this._onTouched();
    this._onChange(value);
    this.stateChanges.next();
  }

  _touched: boolean = false;
  _disabled: boolean = false;

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  @Input()
  set autofilled(value: boolean) {
    this._autofilled = value;
  }

  _autofilled!: boolean | undefined;

  get autofilled(): boolean | undefined {
    return this._autofilled;
  }

  controlType: string | undefined = 'mat-picture-file';

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
      this._onTouched();
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
    const controlElement = this.input.nativeElement;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {

    return this.focused || !this.empty;
  }

  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
    this.stateChanges.next();
  }

  get disabled(): boolean {
    return this._disabled;
  }

  stateChanges = new Subject<void>();
  _onChange = (value: File | null) => {
  }
  _onTouched = () => {
  };

  constructor(
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {

  }


  openDialogPictureUI() {
    const dialogRef = this.dialog.open(PictureUiComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.preViewData = result;
      const byteCharacters = atob(result.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const file = new File([byteArray], 'picture.png', {type: 'image/png'});
      this.writeValue(file);
    })
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
    this.stateChanges.next();
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  writeValue(obj: File): void {
    this._value = obj;

    this._onChange(obj)
    this.empty = obj === null;
  }

  clear(): void {
    this.value = null;
    this._onChange(null);
    this.stateChanges.next();
  }

  preview(): void {
    this.dialog.open(PicturePreViewComponent, {data: {dataPreview: this.preViewData}})
  }

  download(): void {
    const link = document.createElement('a');
    link.download = 'picture.png';
    link.href = URL.createObjectURL(this.value as File);
    link.click();
    URL.revokeObjectURL(link.href);
  }

  //Móviles Pequeños (320-480)	320	Automático (mantener proporción)	Priorizar imágenes comprimidas para cargar más rápido.
  // Móviles Medianos (375-667)	375	Automático	Ideal para iPhones.
  // Tabletas (768-1024)	768	Automático	Considerar imágenes de mayor resolución para pantallas de alta densidad.
  // Laptops (1024-1366)	1024	Automático	Imágenes de buena calidad para una visualización cómoda.
  // Desktops (1366-1920+)	1366 o 1920	Automático	Imágenes de alta resolución para pantallas grandes.
}
