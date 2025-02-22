import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../services/api-service.service';
import { Usuarios as Member, Usuarios } from '../../models/user.interface';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { CardUserComponent } from '../../components/card-user/card-user.component';

@Component({
  selector: 'app-pupils',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfirmModalComponent,CardUserComponent],
  templateUrl: './pupils.component.html',
  styleUrl: './pupils.component.css'
})
export class PupilsComponent implements OnInit {
  loading: { [key: number]: boolean } = {};
  public members: Member[] = [];
  public id: number = 0;
  public showModal: boolean = false;
  public selectedPupilId: number | null = null;

  constructor(private router: Router, public service: ApiService) { }

  // Obtener la lista de alumnos desde el servicio
  public getResponsePupils(): void {
    this.service.getResponsePupils().subscribe(
      (response) => {
        response.map((member) => {
          if (member.rol !== "entrenador") {
            this.members.push(member);
          }
        });
        console.log(this.members);
      },
      (error) => {
        console.error("Error al obtener los alumnos:", error);
      }
    );
  }

  ngOnInit(): void {
    this.getResponsePupils();
  }

  public deletePupils(id: number): void {
    this.selectedPupilId = id;
    this.showModal = true;
  }

  public confirmDelete(): void {
    if (!this.selectedPupilId) return;

    const id = this.selectedPupilId;
    this.loading[id] = true;
  
    this.service.deletePupils(id).subscribe({
      next: () => {
        this.members = this.members.filter(member => member.id !== id);
        alert('Alumno eliminado correctamente');
        this.showModal = false;
        this.selectedPupilId = null;
      },
      error: (error) => {
        console.error('Error al eliminar el alumno:', error);
        alert('Error al eliminar el alumno');
      },
      complete: () => {
        this.loading[id] = false;
      }
    });
  }


  public CancelDelete(): void {
    this.showModal = false;
    this.selectedPupilId = null;
  }


  isLoading(id: number): boolean {
    return this.loading[id] || false;
  }

  // Método para editar un alumno
  editarAlumno(alumno: Usuarios) {
    localStorage.setItem('userData', JSON.stringify(alumno));
    this.router.navigate(['/editUser']);
  }
}