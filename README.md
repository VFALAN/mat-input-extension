# MatInputExtension

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.
and support angular material 17.x.x ^
## mat-picture-input
This component was design for take pictures in the most simple way in
order to prevent dependency of another packages
```html
<mat-picture-input></mat-picture-input>
```
this component its compatible with  reactive forms
```html

<form [formGroup]="form">
  <label for="">Picture</label>
  <mat-picture-input formControlName="picture"></mat-picture-input>
</form>
```
the only format supported is: image/jpg.

## options
``` ts
@Input()
enabledPreview:boolean = false;
@Input()
enabledDownload:boolean = false;
```

in case to use any of those options be sure that the resource is reachable via http get

## mat-input-file
```html
<mat-input-file></mat-input-file>
```

this component it's compatible with reactive forms

```html
<form [formGroup]="form">
  <label >File</label>
  <mat-input-file formControlName="file"></mat-input-file>
</form>
```
be sure to define as null in blank case
```ts
import {FormBuilder, Validators} from "@angular/forms";
form = FormBuilder.group({
  file: [null, Validators.required]
})
```
compatible with MatFormField
```html
<form [formGroup]="form">
  <mat-form-field>
    <mat-label>File</mat-label>
    <mat-input-file formControlName="file"></mat-input-file>
  </mat-form-field>
</form>
```

## output
returns File native object
```ts
() => {
  const file: File = this.form.controls['file'].value;
}
```
