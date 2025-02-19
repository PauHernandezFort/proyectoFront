import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api-service.service';
import { Usuarios as Member, Progreso } from '../../../models/user.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  public members: Member[] = [];
  public photo: string = "";

  constructor(public service: ApiService) { }

  createProgress = new FormGroup({
    date: new FormControl(new Date(), { nonNullable: true }),
    comentarios: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    photo: new FormControl('', { nonNullable: true }),
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
      const progreso: Progreso = {
        fecha: this.createProgress.getRawValue().date,
        descripcion: this.createProgress.getRawValue().comentarios,
        archivo: this.createProgress.getRawValue().photo, // Se debe manejar como FormData si es un archivo
        idMiembro: Number(this.createProgress.getRawValue().idMember)
      };
      console.log("Enviando progreso:", progreso);
      this.postResponseProgress(progreso);
    } else {
      console.error("El formulario no es válido");
    }
  }

  public postResponseProgress(progreso: Progreso): void {
    this.service.createProgress(progreso).subscribe(
      (response) => {
        console.log("Progreso creado correctamente:", response);
      },
      (error) => {
        console.error("Error al crear progreso:", error);
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          this.createProgress.patchValue({ photo: result });
        }
      };
    }
  }

  private updateProgress() {
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
    window.location.reload();
  }
}
