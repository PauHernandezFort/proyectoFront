import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api-service.service';
import { Usuarios as Member, Progreso } from '../../../models/user.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-progress',
  imports: [ReactiveFormsModule],
  templateUrl: './create-progress.component.html',
  styleUrl: './create-progress.component.css'
})
export class CreateProgressComponent implements OnInit {
  photosUploaded: number = 0;
  targetPhotos: number = 10; // Objetivo de fotos a subir
  progressPercentage: number = 0;
  members: Member[] = [];
  photo: string = "";
  selectedFile: File | null = null;
  imageData: { id: number, fotoPerfil: string } = { id: 0, fotoPerfil: "" };
  id: string = "";

  constructor(public service: ApiService, private router: Router) { }

  createProgress = new FormGroup({
    date: new FormControl(new Date(), { nonNullable: true }),
    comentarios: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    photoProgress: new FormControl('', { nonNullable: true }),
    idMember: new FormControl('', { nonNullable: true })
  });

  // Obtener la lista de alumnos desde el servicio
  public getResponsePupils(): void {
    this.service.getResponsePupils().subscribe(
      (response) => {
        this.members = response;
        console.log(this.members);
      },
      (error) => {
        console.error("Error al obtener los alumnos:", error);
      }
    );
  }

  onSubmit() {
    if (this.createProgress.valid) {
      const dataProgress: Progreso = {
        fecha: this.createProgress.getRawValue().date,
        descripcion: this.createProgress.getRawValue().comentarios,
        idMiembro: `/api/usuarios/${this.createProgress.getRawValue().idMember}`,
        archivo: this.createProgress.getRawValue().photoProgress,
      };
      console.log(dataProgress.archivo);
      this.postResponseProgress(dataProgress);
    }
  }

  public postResponseProgress(progress: Progreso): void {
    this.service.createProgress(progress).subscribe(
      (response) => {
        console.log("Progreso creado correctamente:", response);
        this.router.navigate(['/progress']);
      },
      (error) => {
        console.error("Error al crear progreso:", error);
      }
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photo = reader.result as string;
        this.createProgress.patchValue({ photoProgress: this.photo });

        const imageData = {
          id: Number(this.id),
          fotoPerfil: this.photo,
        };

        this.imageData = imageData;
        this.updateUserPhoto(this.imageData);
      };
      reader.readAsDataURL(file);
    }
  }

  updateUserPhoto(imageData: { id: number; fotoPerfil: string }): void {
    this.service.updatePhotoUser(imageData).subscribe(
      (response) => {
        console.log(response.ruta);
      },
      (error) => {
        console.error('Error al actualizar la foto de perfil:', error);
        alert('Error al actualizar la foto de perfil');
      }
    );
  }

  updateProgress(): void {
    this.progressPercentage = Math.min(
      Math.round((this.photosUploaded / this.targetPhotos) * 100),
      100
    );
  }

  ngOnInit() {
    this.getResponsePupils();
    this.updateProgress();
  }

  cancelar() {
    this.router.navigate(['/pupils']);
  }
}
