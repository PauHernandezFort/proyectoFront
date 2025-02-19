import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../services/api-service.service';
import { Usuarios as Member } from '../../models/user.interface'; // Asegúrate de que la interfaz es correcta

@Component({
  selector: 'app-pupils',
  imports: [RouterLink],
  templateUrl: './pupils.component.html',
  styleUrl: './pupils.component.css'
})
export class PupilsComponent implements OnInit {
  loading: { [key: number]: boolean } = {}; // Cambiado de string a number
  public showPhotos: boolean = false;
  public members: Member[] = []; // Lista de usuarios
  public id: number = 0;

  constructor(private router: Router, public service: ApiService) {}

  // Obtener la lista de alumnos desde el servicio
  public getResponsePupils(): void {
    this.service.getResponsePupils().subscribe(
      (response) => {
        this.members = response; // Ya se extrae 'member' en el servicio
      },
      (error) => {
        console.error("Error al obtener los alumnos:", error);
      }
    );
  }

  ngOnInit(): void {
    this.getResponsePupils();
  }

  // Método para eliminar un alumno
  public deletePupil(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este alumno?')) return;

    this.loading[id] = true; // Activar el estado de carga

    this.service.deletePupils(id).subscribe(
      () => {
        // Filtramos la lista para eliminar el alumno localmente
        this.members = this.members.filter(member => member.id !== id);
        alert('Alumno eliminado correctamente');
      },
      (error) => {
        console.error("Error al eliminar el alumno:", error);
      },
      () => {
        this.loading[id] = false; // Desactivar el estado de carga
      }
    );
  }

  // Función para saber si un alumno está en proceso de eliminación
  isLoading(id: number): boolean {
    return this.loading[id] || false;
  }

  // Método para editar un alumno
  editarAlumno(alumno: Member) {
    localStorage.setItem('userData', JSON.stringify(alumno));
    this.router.navigate(['/editUser']);
  }
}