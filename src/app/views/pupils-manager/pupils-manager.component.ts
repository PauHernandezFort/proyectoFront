import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api-service.service';
import { Usuarios as Member } from '../../models/user.interface'; // Asegúrate de que la interfaz es correcta

@Component({
  selector: 'app-pupils-manager',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './pupils-manager.component.html',
  styleUrl: './pupils-manager.component.css'
})


export class PupilsManagerComponent {
  loading: { [key: string]: boolean } = {};
  public trainers: Member[] = [];
  public id: number = 0;

  constructor(public service: ApiService) { }

  ngOnInit(): void {
    this.getResponseTrainers();
  }

  public getResponseTrainers(): void {
    this.service.getResponsePupils().subscribe(
      (response) => {
        response.forEach((member) => {
          if (member.rol === "entrenador") {
            this.trainers.push(member);
          }
        });
        console.log(this.trainers);
        //this.trainers = response.filter((user: Usuarios) => user.rol === "Entrenador");
      },
      (error) => {
        console.error("Error al obtener los entrenadores:", error);
      }
    );
  }

  deleteTrainer(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este entrenador?')) {
      this.loading[id] = true;
      setTimeout(() => {
        this.loading[id] = false;
        alert('Entrenador eliminado correctamente');
      }, 1000);
    }
  }

  isLoading(id: string): boolean {
    return this.loading[id] || false;
  }
}