import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ApiService } from '../../../services/api-service.service';
import { Usuarios } from '../../../models/user.interface';

@Component({
  selector: 'app-crear-entrenador',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './crear-entrenador.component.html',
  styleUrls: ['./crear-entrenador.component.css']
})
export class CrearEntrenadorComponent {
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  passwordsMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsDoNotMatch: true };
  };

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  createEntrenador = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    apellido: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    telefono: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{9}$/)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5)] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    rol: new FormControl('entrenador', { nonNullable: true })
  }, { validators: this.passwordsMatchValidator });

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  public createEntrenadors(entrenador: Usuarios): void {
    this.apiService.createPupil(entrenador).subscribe({
      next: (response) => {
        console.log("Entrenador creado correctamente", response);
        alert('Entrenador creado correctamente');
        this.router.navigate(['/pupilsmanager']);
      },
      error: (error) => {
        console.error("Error al crear el entrenador:", error);
        alert('Error al crear el entrenador');
      }
    });
  }

  onSubmit() {
    if (this.createEntrenador.invalid) {
      this.createEntrenador.markAllAsTouched();
      return;
    }

    const entrenador: Usuarios = {
      nombre: this.createEntrenador.getRawValue().nombre,
      apellido: this.createEntrenador.getRawValue().apellido,
      telefono: Number(this.createEntrenador.getRawValue().telefono),
      email: this.createEntrenador.getRawValue().email,
      password: this.createEntrenador.getRawValue().password,
      rol: this.createEntrenador.getRawValue().rol
    };

    console.log("Enviando datos:", entrenador);
    this.createEntrenadors(entrenador);
  }

  getControl(controlName: string) {
    return this.createEntrenador.get(controlName);
  }
}