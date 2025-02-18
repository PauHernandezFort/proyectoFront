import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../../../services/api-service.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-create-class',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent {
  createClass = new FormGroup({
    nameClass: new FormControl('', Validators.required),
    teacherName: new FormControl('', Validators.required),
    capacity: new FormControl('', [Validators.required, Validators.min(1)]),
    classInfo: new FormControl(''),
    classDate: new FormControl('', Validators.required),
    classStatus: new FormControl('', Validators.required),
  });

  constructor(public apiService: ApiServiceService) {}

  onSubmit() {
    if (this.createClass.valid) {
      const formData = this.createClass.value;
  
      // Transformar formData a formato LD-JSON
      const ldJsonData = {
        "@context": "http://schema.org", // Contexto, puedes ajustar según el caso
        "@type": "Class", // Tipo del objeto, puedes ajustar según el caso
        "name": formData.nameClass,
        "description": formData.classInfo,
        "teacher": formData.teacherName,
        "date": formData.classDate
        // Aquí puedes agregar más campos dependiendo de los datos del formulario
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
}