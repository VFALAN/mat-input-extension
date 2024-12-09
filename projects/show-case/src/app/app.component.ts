import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatInputFileComponent} from "mat-input-file";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputFileComponent,
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
      file : [null, [Validators.required]],
    })
  }

  protected readonly console = console;
}
