import { NgModule } from '@angular/core';
import { MatInputExtensionComponent } from './mat-input-extension.component';
import { MatInputFileComponent } from './mat-input-file/mat-input-file.component';
import {MatIcon} from "@angular/material/icon";
import {MatInput, MatSuffix} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";



@NgModule({
  declarations: [
    MatInputExtensionComponent,
    MatInputFileComponent
  ],
  imports: [
    MatIcon,
    MatInput,
    MatIconButton,
    MatSuffix
  ],
  exports: [
    MatInputFileComponent
  ]
})
export class MatInputExtensionModule { }
