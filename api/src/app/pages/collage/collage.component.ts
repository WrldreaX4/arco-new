import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { BrowserService } from '../../services/browser.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-collage',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './collage.component.html',
  styleUrls: ['./collage.component.css']
})
export class CollageComponent {
  imageUrls: string[] = []; // Initialize an empty array to store image URLs

  image: File|null=null;

  constructor(private browserService: BrowserService, private auth: AuthService) {}

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

  submitCollage() {
    if (this.imageUrls.length > 0) {
      const formData = new FormData();
  
      const fetchPromises = this.imageUrls.map((url, index) =>
        fetch(url)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], `image${index}.png`, { type: 'image/png' });
            formData.append('images[]', file, `image${index}.png`);
          })
      );
  
      Promise.all(fetchPromises).then(() => {
        this.auth.submitCollage(formData).subscribe(
          data => {
            console.log('Collage added successfully', data);
          },
          error => {
            console.log('Error', error);
          }
        );
      });
    }
  }   
  
  removeImage(imageUrl: string) {
    this.imageUrls = this.imageUrls.filter(url => url !== imageUrl);
  }

  createCollage() {
    if (this.browserService.document) { // Use BrowserService to safely access the document
      const canvas: HTMLCanvasElement = this.collageCanvas.nativeElement;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        const imageCount = this.imageUrls.length;
        const collageWidth = 400;
        const collageHeight = 400;

        canvas.width = collageWidth;
        canvas.height = collageHeight;

        const gridSize = Math.ceil(Math.sqrt(imageCount));
        const cellWidth = collageWidth / gridSize;
        const cellHeight = collageHeight / gridSize;

        ctx.clearRect(0, 0, collageWidth, collageHeight);

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
  }

  cancelCollage() {
    this.imageUrls = [];
    this.imageInput.nativeElement.value = '';
    if (this.browserService.document) { // Use BrowserService to safely access the document
      const canvas: HTMLCanvasElement = this.collageCanvas.nativeElement;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }

  loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  downloadPDF(): void {
    const canvas: HTMLCanvasElement = this.collageCanvas.nativeElement;
    html2canvas(canvas, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('collage.pdf');
    });
  }
}
