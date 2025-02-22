import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ApiService } from '../../../services/api-service.service';
import { Usuarios } from '../../../models/user.interface';

@Component({
  selector: 'app-crear-alumno',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css']
})
export class CrearAlumnoComponent {

   passwordsMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsDoNotMatch: true };
  };

  createPupil = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    apellido: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    telefono: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{9}$/)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5)] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    rol: new FormControl('alumno', { nonNullable: true }) // ✅ Se mantiene el campo 'rol'
  }, { validators: this.passwordsMatchValidator });

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  public createPupils(alumno: Usuarios): void {
    this.apiService.createPupil(alumno).subscribe((response) => {
      if (response) {
        console.log("Alumno creado correctamente", response);
        alert('Alumno creado correctamente');
        this.router.navigate(['/pupils']);
      } else {
        console.error("Error al crear el alumno.");
      }
    });
  }

  onSubmit() {
    if (this.createPupil.invalid) {
      this.createPupil.markAllAsTouched();
      return;
    }

    let pupil: Usuarios = {
      nombre: this.createPupil.getRawValue().nombre,
      apellido: this.createPupil.getRawValue().apellido,
      telefono: Number(this.createPupil.getRawValue().telefono),
      email: this.createPupil.getRawValue().email,
      password: this.createPupil.getRawValue().password,
      rol: this.createPupil.getRawValue().rol 
    };

    console.log("Enviando datos:", pupil);
    this.createPupils(pupil);
  }

  getControl(controlName: string) {
    return this.createPupil.get(controlName);
  }
}