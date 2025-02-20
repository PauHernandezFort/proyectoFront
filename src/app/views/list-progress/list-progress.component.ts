import { Component } from '@angular/core';
import { ApiService } from '../../services/api-service.service';
import { Progreso, Usuarios } from '../../models/user.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-progress',
  imports: [RouterLink],
  templateUrl: './list-progress.component.html',
  styleUrl: './list-progress.component.css'
})
export class ListProgressComponent {
  public listProgress: Progreso[] = [];
  public dateProgress: string = "";
  public namePupil: string = "";
  public urlIdUser: string | undefined = undefined;

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
}
