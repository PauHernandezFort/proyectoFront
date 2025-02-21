import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../services/api-service.service';
import { Usuarios as Member, Usuarios } from '../../models/user.interface'; // Asegúrate de que la interfaz es correcta
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-pupils',
  imports: [RouterLink, ConfirmModalComponent],
  templateUrl: './pupils.component.html',
  styleUrl: './pupils.component.css'
})
export class PupilsComponent implements OnInit {
  loading: { [key: number]: boolean } = {};
  public members: Member[] = []; 
  public id: number = 0;
  public showModal: boolean = false;
  public selectedPupilId: number | null = null;

  constructor(private router: Router, public service: ApiService) {}

  // Obtener la lista de alumnos desde el servicio
  public getResponsePupils(): void {
    this.service.getResponsePupils().subscribe(
      (response) => {
        response.forEach((member) => {
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

  // Reemplazar el método deletePupil existente por estos dos métodos:
  public deletePupils(id: number): void {
    this.selectedPupilId = id;
    this.showModal = true;
  }

  public confirmDelete(): void {
    if (!this.selectedPupilId) return;
  
    const id = this.selectedPupilId;
    this.loading[id] = true;
  
    this.service.deletePupils(id).subscribe((success) => {
      if (this.service) {
        this.members = this.members.filter(({ id: memberId }) => memberId !== id);
        alert('Alumno eliminado correctamente');
      } else {
        alert('Error al eliminar el alumno');
      }
      this.loading[id] = false;
      this.showModal = false;
      this.selectedPupilId = null;
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