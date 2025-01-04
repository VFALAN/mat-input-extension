import {AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import e from "express";

@Component({
  selector: 'lib-picture-ui',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './picture-ui.component.html',
  styleUrl: './picture-ui.component.css'
})
export class PictureUiComponent implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialogRef<PictureUiComponent>);
  isCaptured: boolean = false;
  WIDTH = 640;
  HEIGHT = 480;

  @ViewChild("video", {static: true})
  public video!: ElementRef;
  captures: string[] = [];
  @ViewChild("canvas", {static: true})
  public canvas!: ElementRef;
  private stream!: MediaStream;
  file!: File;

  async setupDevices() {

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({video: true});
      if (this.stream) {
        this.video.nativeElement.srcObject = this.stream;
        this.video.nativeElement.play();
      }
    } catch (e) {
      console.error(e);
    }

  }


  capture() {
    this.drawImageToCanvas(this.video.nativeElement);
    this.captures.push(this.canvas.nativeElement.toDataURL('image/png'));
    this.isCaptured = true;
  }

  writePhoto(idx: number) {
    this.isCaptured = true;
    const image = new Image();
    image.src = this.captures[idx];
    this.drawImageToCanvas(image);
  }

  private drawImageToCanvas(image: HTMLImageElement) {
    this.canvas.nativeElement.getContext("2d").drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }

  cancel() {
    this.dialog.close();
  }

  ngOnInit(): void {
    this.setupDevices();
  }

  ngOnDestroy(): void {
    console.log('closing component')
    this.stream.getTracks().forEach(track => {
      console.log('stopping track', {track});
      track.stop()
    })
  }

  save() {
    const data = this.canvas.nativeElement.toDataURL('image/png');
    console.log({data});
    const blob = new Blob([data.replace(/^data:image\/\w+;base64,/, '')], {type: 'image/png'});
    this.file = new File([blob], 'picture', {type: 'image/png'});
    this.dialog.close(this.file);
  }

  constructor() {
  }


}
