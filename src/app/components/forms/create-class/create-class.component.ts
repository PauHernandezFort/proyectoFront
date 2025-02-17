import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiServiceService } from '../../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
export class CreateClassComponent implements OnInit {
  classForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';

  activities = [
    'MMA',
    'Capoeira',
    'Jiu-Jitsu',
    'Saco de Boxeo',
    'Defensa Femenina',
    'Chi-Kung'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiServiceService,
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

  ngOnInit(): void {}

  // Getter para fácil acceso a los campos del formulario
  get f() { return this.classForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.classForm.invalid) {
      return;
    }

    this.loading = true;
    const classData = {
      ...this.classForm.value,
      dateTime: `${this.f['date'].value}T${this.f['startTime'].value}`
    };

    this.apiService.createClass(classData).subscribe({
      next: () => {
        this.router.navigate(['/calendar']);
      },
      error: (error: ApiError) => {
        this.errorMessage = error.message || 'Ha ocurrido un error al crear la clase';
        this.loading = false;
      }
    });
  }

  onReset() {
    this.submitted = false;
    this.classForm.reset();
  }
}

