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
  imports: [CommonModule, RouterLink, ConfirmModalComponent, CardUserComponent],
  templateUrl: './pupils.component.html',
  styleUrl: './pupils.component.css'
})
export class PupilsComponent implements OnInit {
  loading: { [key: number]: boolean } = {};
  members: Member[] = [];
  id: number = 0;
  photo: string = "";
  pupil: { [key: string]: any } = {};
  showModal: boolean = false;
  selectedPupilId: number | null = null;

  constructor(private router: Router, public service: ApiService) { }

  getResponsePupils(): void {
    this.service.getResponsePupils().subscribe(
      (response) => {
        response.map((member) => {
          if (member.rol !== "entrenador") {
            this.members.push(member);
            this.photo = `http://52.2.202.15${member.fotoPerfil}`
            console.log(this.photo);
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
    if (this.selectedPupilId) {
      const id = this.selectedPupilId;
      this.loading[id] = true;

      this.service.deletePupils(id).subscribe(
        () => {
          this.members = this.members.filter(member => member.id !== id);
          alert('Alumno eliminado correctamente');
          this.showModal = false;
          this.selectedPupilId = null;
          this.loading[id] = false;
        },
        error => {
          console.error('Error al eliminar el alumno:', error);
          alert('Error al eliminar el alumno');
          this.loading[id] = false;
        }
      );
    } else {
      console.error('No se encontró el ID del alumno a eliminar');
      alert('Error: No se pudo eliminar el alumno');
    }
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