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
  public id: number = 0;

  constructor(private router: Router, public service: ApiService) { }

  public getResponsePupils(): void {
    this.service.getResponsePupils(this.urlPupils).subscribe((response) => {
      this.members = response.member;
    });
  }

  ngOnInit(): void {
    this.getResponsePupils();
  }

  public deletePupils(): void {
    this.service.deletePupils(this.id).subscribe(response => {
      console.log("Miembro eliminado:", response);
      // Si necesitas actualizar la lista de miembros después de la eliminación
      this.members = this.members.filter(member => member.id !== this.id);
    });
  }

  eliminarAlumno(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
      this.loading[id] = true;
      this.id = id;
      this.deletePupils();

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
  public selectedMember: Member | null = null;

  public selectPupil(member: Member): void {
    this.selectedMember = { ...member }; // Clonamos el objeto para evitar modificar el original antes de confirmar cambios.
  }


  public editPupil(): void {
    if (this.selectedMember) {
      this.service.updatePupils(this.selectedMember.id, this.selectedMember).subscribe(updatedMember => {
        console.log("Alumno actualizado:", updatedMember);
        this.getResponsePupils(); 
        this.selectedMember = null; 
      });
    }
  }
}
