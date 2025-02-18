import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../service/api.service';

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

  constructor(public apiService: ApiService) {}

  onSubmit() {
    console.log('Formulario enviado');
    console.log('Validez del formulario:', this.createClass.valid);
    
    if (this.createClass.valid) {
      alert('Clase creada con éxito');
    } else {
      alert('Por favor, completa todos los campos correctamente');
    }
  }
}
/*
onSubmit() {
  if (this.createClass.valid) {
    const formData = this.createClass.value;
    this.apiService.createClass(formData).subscribe({
      next: (response) => {
        console.log('Clase creada:', response);
        alert('Clase creada con éxito');
      },
      error: (error) => {
        console.error('Error al crear la clase:', error);
        alert('Hubo un error al crear la clase');
      }
    });
  } else {
    alert('Por favor, completa todos los campos correctamente');
  }
}

*/

