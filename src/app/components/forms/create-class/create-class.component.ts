import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../../../services/api-service.service';
import { NgStyle } from '@angular/common';

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


  onClick(): void {
    console.log('Formulario válido:', this.createClass.valid);
    if (this.createClass.valid) {
      this.newClass();
    } else {
      console.log('Por favor, completa todos los campos correctamente');
    }
  }
  
  newClass() {
    console.log('Clase creada');
  }
  
  
}