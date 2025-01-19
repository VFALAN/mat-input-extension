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
  private sourceFileUrl = "https://resize.latenode.com/cdn-cgi/image/width=960,format=auto,fit=scale-down/https://cdn.prod.website-files.com/62c40e4513da320b60f32941/65f1caf8c7b1b478c4477585_%D1%8B-p-800.png"

  constructor() {
    this.form = this.formBuilder.group({
      file: [null, [Validators.required]],
      number: [null, [Validators.required]],
      picture: [null, [Validators.required]],
      picturePreLoad: [this.sourceFileUrl, [Validators.required]],
    })
  }

  protected readonly console = console;
}
