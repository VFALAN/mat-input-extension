import {Component, Inject, inject, OnInit, Optional, Self} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PictureUiComponent} from "../picture-ui/picture-ui.component";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {Subject} from "rxjs";

@Component({
  selector: 'mat-picture-input',
  standalone: false,

  templateUrl: './mat-picture-input.component.html',
  styleUrl: './mat-picture-input.component.css'
})
export class MatPictureInputComponent implements OnInit, ControlValueAccessor {
  readonly dialog = inject(MatDialog);
  private _value!: File;
  stateChanges = new Subject<void>();
  _onChange = (value: File) => {
  }
  _onTouched = () => {
  };

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {

  }


  openDialog() {
    const dialogRef = this.dialog.open(PictureUiComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.writeValue(result);
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
  }
}
