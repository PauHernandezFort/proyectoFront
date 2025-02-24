import { Component } from '@angular/core';
import { ApiService } from '../../services/api-service.service';
import { Progreso, Usuarios } from '../../models/user.interface';
import { RouterLink } from '@angular/router';
import { CardsProgressComponent } from '../../components/cards-progress/cards-progress.component';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-progress',
  standalone: true,
  imports: [ CardsProgressComponent, ConfirmModalComponent, CommonModule],
  templateUrl: './list-progress.component.html',
  styleUrl: './list-progress.component.css'
})
export class ListProgressComponent {
  public listProgress: Progreso[] = [];
  public dateProgress: string = "";
  public namePupil: string = "";
  public urlIdUser: string | undefined = undefined;
  
  // Variables para el modal
  showDeleteModal = false;
  progressToDelete: number | null = null;

  constructor(public service: ApiService) { }

  ngOnInit(): void {
    this.getResponseProgress();
  }

  public getResponseProgress(): void {
    this.service.getProgress().subscribe(
      (response) => {
        this.listProgress = response;
        response.forEach((progress) => {
          this.urlIdUser = progress.idMiembro;
          console.log(this.urlIdUser);
          this.dateProgress = new Date(progress.fecha).toLocaleDateString('es-ES');
        });
        this.getResponsePupilsById();
      },
      (error) => {
        console.error("Error al obtener los alumnos:", error);
      }
    );
  }

  public getResponsePupilsById(): void {
    if (this.urlIdUser !== undefined) {
      this.service.getUser(this.urlIdUser).subscribe((usuario: Usuarios) => {
        this.namePupil = usuario.nombre;
      });
    }
  }

  openDeleteModal(progressId: number | undefined) {
    if (progressId) {
      this.progressToDelete = progressId;
      this.showDeleteModal = true;
    }
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.progressToDelete = null;
  }

  confirmDelete() {
    if (this.progressToDelete) {
      this.service.deleteProgress(this.progressToDelete).subscribe({
        next: () => {
          alert('Progreso eliminado correctamente');
          console.log('Progreso eliminado correctamente');
          this.getResponseProgress(); // Actualizar la lista
          this.showDeleteModal = false;
          this.progressToDelete = null;
        },
        error: (error) => {
          alert('Error al eliminar el progreso');
          console.error('Error al eliminar el progreso:', error);
        }
      });
    }
  }
}
