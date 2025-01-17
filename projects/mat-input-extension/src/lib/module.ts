import {NgModule} from '@angular/core';
import {MatInputExtensionComponent} from './mat-input-extension.component';
import {MatInputFileComponent} from './mat-input-file/mat-input-file.component';
import {MatIcon} from "@angular/material/icon";
import {MatInput, MatSuffix} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputNumberComponent} from "./mat-input-number/mat-input-number.component";
import {MatPictureInputComponent} from "./mat-picture-input/mat-picture-input.component";
import {SuffixInputButtonDirective} from "./suffix-input-button.directive";
import {PicturePreViewComponent} from "./picture-pre-view/picture-pre-view.component";
import {MatCardActions, MatCardContent} from "@angular/material/card";


@NgModule({
  declarations: [
    MatInputExtensionComponent,
    MatInputFileComponent,
    MatInputNumberComponent,
    MatPictureInputComponent,
    SuffixInputButtonDirective
  ],
  imports: [
    MatIcon,
    MatInput,
    MatIconButton,
    MatSuffix,
    MatFormFieldModule,
    CommonModule,
    MatCardContent,
    MatCardActions,
    MatButton
  ],
  exports: [
    MatFormFieldModule,
    MatInputFileComponent,
    MatIcon,
    MatInput,
    MatIconButton,
    MatSuffix,
    CommonModule,
    MatInputNumberComponent,
    MatPictureInputComponent
  ]
})
export class MatInputExtensionModule {
}
