import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api-service.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-class',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent {

 
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
    private apiService: ApiService,
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

  ngOnInit(): void { }

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
      dateTime: ${this.f['date'].value}T${this.f['startTime'].value}
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
  */  


  createClass = new FormGroup({
    nombre: new FormControl('', Validators.required),
    id_entrenador: new FormControl('', Validators.required),
    capacidad: new FormControl('', [Validators.required, Validators.min(1)]),
    estado: new FormControl(''),
    fecha: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required)
  });


  constructor(public apiService: ApiService) { }

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
      this.apiService.createClass(ldJsonData, { headers }).subscribe({
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
    this.apiService.getUser('http://52.2.202.15/api/usuarios').subscribe({
      next: (response) => {
        console.log('Usuarios recibidos:', response);
        //this.usuarios = response.nombre;  // Asigna toda la respuesta (el array de usuarios) a la variable
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }
}