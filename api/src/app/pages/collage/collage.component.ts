import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-collage',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './collage.component.html',
  styleUrl: './collage.component.css'
})
export class CollageComponent implements OnInit {
  title = 'collage';

  constructor(private location: Location) {}

  ngOnInit(): void {}

  imageUrls: string[] = []; // Initialize an empty array to store image URLs

  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('collageCanvas') collageCanvas!: ElementRef<HTMLCanvasElement>;

  onFileSelected(files: FileList | null) {
    const maxImages = 8;
    if (files) {
      for (let i = 0; i < Math.min(maxImages - this.imageUrls.length, files.length); i++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = (event: Event) => {
          const fileReader = event.target as FileReader;
          this.imageUrls.push(fileReader.result as string);
        };
      }
    }
  }

  removeImage(imageUrl: string) {
    this.imageUrls = this.imageUrls.filter(url => url !== imageUrl);
  }

  createCollage() {
    const canvas: HTMLCanvasElement = this.collageCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const imageCount = this.imageUrls.length;
      const collageWidth = 400; // Define the width of the collage
      const collageHeight = 400; // Define the height of the collage

      canvas.width = collageWidth;
      canvas.height = collageHeight;

      const gridSize = Math.ceil(Math.sqrt(imageCount));
      const cellWidth = collageWidth / gridSize;
      const cellHeight = collageHeight / gridSize;

      ctx.clearRect(0, 0, collageWidth, collageHeight); // Clear the canvas

      let imagePromises = this.imageUrls.map((imageUrl) => this.loadImage(imageUrl));

      Promise.all(imagePromises).then(images => {
        images.forEach((img, index) => {
          const x = (index % gridSize) * cellWidth;
          const y = Math.floor(index / gridSize) * cellHeight;
          ctx.drawImage(img, x, y, cellWidth, cellHeight);
        });
      });
    }
  }

  cancelCollage() {
    window.location.reload(); // Reload the page
  }

  loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }
}
