import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatCardActions, MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";


@Component({
  selector: 'picture-pre-view',
  standalone: true,
  imports: [MatCardActions, MatCardModule, MatInputModule, MatDialogModule, MatIconModule, MatIconButton, MatButton],
  templateUrl: './picture-pre-view.component.html',
  styleUrl: './picture-pre-view.component.css'
})
export class PicturePreViewComponent implements OnInit, OnDestroy {

  data = inject<any>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<PicturePreViewComponent>);
  source!: any;

  constructor() {
  }

  async loadImage() {
    console.log(this.data)
    this.source = this.data.source;
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.loadImage();

  }

  download() {

  }

  cancel() {
    this.dialogRef.close();
  }
}
