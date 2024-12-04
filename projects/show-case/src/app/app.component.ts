import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatInputFileComponent} from "mat-input-file";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon, MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputFileComponent, MatInputModule, CommonModule, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'showCase';
}
