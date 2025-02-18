import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api-service.service';
import { Member } from '../../interfaces/user.interface';

@Component({
  selector: 'app-pupils',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pupils.component.html',
  styleUrl: './pupils.component.css'
})
export class PupilsComponent {
  public members: Member[] = [];
  public selectedMember: Member | null = null;
  loading: { [key: string]: boolean } = {};

  constructor(private router: Router, public service: ApiService) {}

  ngOnInit(): void {
    this.getResponsePupils();
  }

  public getResponsePupils(): void {
    this.service.getResponsePupils("http://52.2.202.15/api/usuarios").subscribe((response) => {
      this.members = response.member;
    });
  }

  eliminarAlumno(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
      this.loading[id] = true;
      this.service.deleteUser(Number(id)).subscribe({
        next: () => {
          this.members = this.members.filter(member => member.id !== Number(id));
          this.loading[id] = false;
          alert('Alumno eliminado correctamente');
        },
        error: (error) => {
          console.error('Error al eliminar alumno:', error);
          this.loading[id] = false;
          alert('Error al eliminar el alumno');
        }
      });
    }
  }

  isLoading(id: string): boolean {
    return this.loading[id] || false;
  }

  public selectPupil(member: Member): void {
    this.selectedMember = { ...member }; // Clonamos el objeto para evitar modificar el original antes de confirmar cambios.
  }

  public editPupil(): void {
    if (this.selectedMember) {
      this.service.updateUser(this.selectedMember.id, this.selectedMember).subscribe(updatedMember => {
        console.log("Alumno actualizado:", updatedMember);
        this.getResponsePupils(); 
        this.selectedMember = null; 
      });
    }
  }
}