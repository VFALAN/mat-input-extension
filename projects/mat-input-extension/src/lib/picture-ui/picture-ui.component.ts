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
import {BreakpointObserver} from "@angular/cdk/layout";

export interface screenCase {
  minWidth: number;
  maxWidth: number;
}

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
  readonly smallScreen: screenCase = {
    minWidth: 0,
    maxWidth: 374
  }
  readonly mediumScreen: screenCase = {
    minWidth: 375,
    maxWidth: 799
  }
  readonly largeScreen: screenCase = {
    minWidth: 800,
    maxWidth: 1200
  }
  width: number = 280;

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


  private drawImageToCanvas(image: HTMLImageElement) {
    const height = this.video.nativeElement.clientHeight;
    const width = this.video.nativeElement.clientWidth;
    console.log(height, width)
    console.log(image.src)
    this.canvas.nativeElement.width = width;
    this.canvas.nativeElement.height = height;
    this.canvas.nativeElement.getContext("2d").drawImage(image, 0, 0, width, height);

  }

  cancel() {
    this.dialog.close(null);
  }

  ngOnInit(): void {
    this.setupDevices().then();
  }

  ngOnDestroy(): void {

    this.stream.getTracks().forEach(track => {

      track.stop();
    })
  }

  tempdata!: any;

  save() {
    const data = this.canvas.nativeElement.toDataURL('image/png');
    const byteCharacters = atob(data.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new File([byteArray], 'picture.png', {type: 'image/png'});

    this.dialog.close(file);
  }

  constructor(private readonly breakPointObserver: BreakpointObserver) {
  }


}
