import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api-service.service';
import { Usuarios as Member } from '../../models/user.interface'; // Asegúrate de que la interfaz es correcta
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { CardUserComponent } from '../../components/card-user/card-user.component';

@Component({
  selector: 'app-pupils-manager',
  standalone: true,
  imports: [RouterLink, CommonModule, ConfirmModalComponent,CardUserComponent],
  templateUrl: './pupils-manager.component.html',
  styleUrl: './pupils-manager.component.css'
})

export class PupilsManagerComponent {
  loading: { [key: string]: boolean } = {};
  public trainers: Member[] = [];
  public id: number = 0;
  public showModal: boolean = false;
  public selectedTrainerId: string | null = null;

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

  public deleteTrainer(id: string): void {
    this.selectedTrainerId = id;
    this.showModal = true;
  }

  public confirmDelete(): void {
    if (!this.selectedTrainerId) return;
    
    const id = this.selectedTrainerId;
    this.loading[id] = true;

    this.service.deletePupils(Number(id)).subscribe((success) => {
      if (this.service) {
        this.trainers = this.trainers.filter(trainer => trainer.id !== Number(id));
        alert('Entrenador eliminado correctamente');
      } else {
        alert('Error al eliminar el entrenador');
      }
      this.loading[id] = false;
      this.showModal = false;
      this.selectedTrainerId = null;
    });
  }

  public CancelDelete(): void {
    this.showModal = false;
    this.selectedTrainerId = null;
  }

  isLoading(id: string): boolean {
    return this.loading[id] || false;
  }
}