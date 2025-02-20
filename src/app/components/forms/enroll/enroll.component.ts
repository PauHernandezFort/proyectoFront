import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enroll',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent {
  enroll = new FormGroup({
    studentName: new FormControl('', Validators.required),
    activity: new FormControl('', Validators.required)
  });

  /*constructor(public apiService: ApiService) {}*/

  onSubmit() {
    console.log('Formulario enviado');
    console.log('Validez del formulario:', this.enroll.valid);
    
    if (this.enroll.valid) {
      alert('Alumno inscrito con éxito');
      // Aquí puedes agregar la lógica para enviar el formulario al servidor
    } else {
      alert('Por favor, completa todos los campos correctamente');
    }
  }


  /*
  onSubmit2() {
    if(this.enroll.valid){
      const formData = this.enroll.value;
      this.apiService.Enrolls(formData).subscribe({
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
  }
