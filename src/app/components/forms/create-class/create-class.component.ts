import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../../../services/api-service.service';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../../interfaces/user.interface';


@Component({
  selector: 'app-create-class',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent {
  createClass = new FormGroup({
    nombre: new FormControl('', Validators.required),
    id_entrenador: new FormControl('', Validators.required),
    capacidad: new FormControl('', [Validators.required, Validators.min(1)]),
    estado: new FormControl(''),
    fecha: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required)
  });


  constructor(public apiService: ApiService) {}

  onSubmit() {
    if (this.createClass.valid) {
      const formData = this.createClass.value;
  
      // Transformar formData a formato LD-JSON

       
      const ldJsonData = {
        "nombre": formData.nombre,
        "id_entrenador": formData.id_entrenador,
        "capacidad": formData.capacidad,
        "estado": formData.estado,
        "fecha": formData.fecha,
        "descripcion": formData.descripcion
      };
  
      // Mostrar los datos transformados en formato LD-JSON
      console.log('Datos transformados a LD-JSON:', JSON.stringify(ldJsonData));
  
      // Configurar los encabezados para LD-JSON
      const headers = new HttpHeaders({
        'Content-Type': 'application/ld+json'
      });
  
      // Enviar los datos al backend con los encabezados correctos
      this.apiService.createClass(ldJsonData, {headers}).subscribe({
        next: (response) => {
          console.log('Clase creada con éxito:', response);
          alert('Clase creada con éxito');
          this.createClass.reset();
        },
        error: (error) => {
          console.error('Error al crear la clase:', error);
          console.log('Detalles del error:', {
            message: error.message,
            status: error.status,
            url: error.url
          });
          alert('Hubo un error al crear la clase');
        }
      });
    } else {
      alert('Por favor, completa todos los campos correctamente');
    }

  }
 /* ngOnInit() {
    const headers = new HttpHeaders().set('Accept', 'application/ld+json');
    this.apiService.getClases({ headers }).subscribe({
      next: (response) => {
        console.log('Clases obtenidas con éxito:', response);
      },
      error: (error) => {
        console.error('Error al obtener las clases:', error);
        alert('Hubo un error al obtener las clases');
      }
    });
  }
    */
  
  public usuarios: string = '';
  ngOnInit(): void {
    this.apiService.getUsuario('http://52.2.202.15/api/usuarios').subscribe({
      next: (response) => {
        console.log('Usuarios recibidos:', response);
        this.usuarios = response.nombre;  // Asigna toda la respuesta (el array de usuarios) a la variable
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }
}