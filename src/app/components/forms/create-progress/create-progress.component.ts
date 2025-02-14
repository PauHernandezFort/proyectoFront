import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-progress',
  imports: [],
  templateUrl: './create-progress.component.html',
  styleUrl: './create-progress.component.css'
})
export class CreateProgressComponent implements OnInit {
  photosUploaded: number = 0;
  targetPhotos: number = 10; // Objetivo de fotos a subir
  progressPercentage: number = 0;

  ngOnInit() {
    // Aquí podrías cargar el número actual de fotos desde un servicio
    this.updateProgress();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.photosUploaded++;
      this.updateProgress();
    }
  }

  private updateProgress() {
    this.progressPercentage = Math.min(
      Math.round((this.photosUploaded / this.targetPhotos) * 100),
      100
    );
  }
  constructor(private router: Router) {}

  cancelar() {
    window.location.reload();
  }
}
