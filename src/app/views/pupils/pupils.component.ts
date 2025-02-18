import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../services/api-service.service';
import { Member } from '../../models/user.interface';

@Component({
  selector: 'app-pupils',
  imports: [RouterLink],
  templateUrl: './pupils.component.html',
  styleUrl: './pupils.component.css'
})
export class PupilsComponent {
  loading: { [key: string]: boolean } = {};
  public photo: string = "";
  public title: string = "";
  public urlPupils: string = "http://52.2.202.15/api/usuarios";
  public showPhotos: boolean = false;
  public members: Member[] = [];

  constructor(private router: Router, public service: ApiService) {}

  public getResponsePupils(): void {
    this.service.getResponsePupils(this.urlPupils).subscribe((response) => {
      this.members = response.member;
      console.log(this.members);
    });
  }
  
  eliminarAlumno(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
      this.loading[id] = true;
      
      // Simulamos la eliminación con un timeout
      setTimeout(() => {
        this.loading[id] = false;
        alert('Alumno eliminado correctamente');
      }, 1000);
    }
  }

  isLoading(id: number): boolean {
    return this.loading[id] || false;
  }

  editarAlumno(alumno: any) {
    // Guardar los datos del alumno en localStorage antes de navegar
    localStorage.setItem('userData', JSON.stringify(alumno));
    this.router.navigate(['/editUser']);
  }
}

