import {Component, inject} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInputExtensionModule} from "mat-input-extension";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputExtensionModule,
    MatInputModule,
    CommonModule,
    MatIcon,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'showCase';
  formBuilder = inject(FormBuilder)
  form: FormGroup;

  constructor() {
    this.form = this.formBuilder.group({
      file: [null, [Validators.required]],
      number: [null, [Validators.required]],
    })
  }

  protected readonly console = console;
}
