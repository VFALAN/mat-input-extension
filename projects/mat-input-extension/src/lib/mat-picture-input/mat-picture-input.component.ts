import {Component, inject, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PictureUiComponent} from "../picture-ui/picture-ui.component";

@Component({
  selector: 'mat-picture-input',
  standalone: false,

  templateUrl: './mat-picture-input.component.html',
  styleUrl: './mat-picture-input.component.css'
})
export class MatPictureInputComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {

  }

  openDialog() {
    const dialogRef = this.dialog.open(PictureUiComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }
}
