import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Clases } from '../../../interfaces/user.interface';

interface ApiError {
  message: string;
}

@Component({
  selector: 'app-create-class',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent  {
  classForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';
  public clases: Clases[] = [];
  activities = ['Boxeo', 'Kickboxing', 'MMA', 'Muay Thai']; // Lista de actividades disponibles

  constructor(
    private formBuilder: FormBuilder,
    private service: ApiService,
    private router: Router
  ) {
    this.classForm = this.formBuilder.group({
      activity: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      maxParticipants: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      level: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getResponsePupils();
  }

  public getResponsePupils(): void {
    this.service.getResponsePupils("http://52.2.202.15/api/clases").subscribe((response) => {
      this.clases = response.clases;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.classForm.valid) {
      this.loading = true;
      
      const nuevaClase: Clases = {
        nombre: this.classForm.value.activity,
        descripcion: this.classForm.value.description,
        fecha: new Date(this.classForm.value.date),
        capacidad: this.classForm.value.maxParticipants,
        estado: 'activa',
        id_entrenador: 1,
        ubicacion: 'Gimnasio Principal'
      };

      this.service.createClase(nuevaClase).subscribe(() => {
        alert('Clase creada exitosamente');
        this.loading = false;
        this.router.navigate(['/clases']);
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.classForm.reset();
  }
}

