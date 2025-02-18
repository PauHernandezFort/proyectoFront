import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Pupils, Member } from '../../../interfaces/user.interface';
import { ImageModalComponent } from '../../image-modal/image-modal.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-show-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, ImageModalComponent],
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {
  userData: Pupils | null = null;
  selectedImage: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Recuperar los datos del usuario del localStorage
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }

    // Inicializa el objeto pupils con las propiedades correctas
    this.userData = {
      "@context": "tu_contexto_aqui", // Ajusta según sea necesario
      "@id": "tu_id_aqui", // Ajusta según sea necesario
      "@type": "tu_tipo_aqui", // Ajusta según sea necesario
      totalItems: 0,
      member: [] // Inicializa como un array de Member
    };

    // Ejemplo de cómo agregar un miembro
    const newMember: Member = {
      "@id": "miembro_id_aqui",
      "@type": "miembro_tipo_aqui",
      id: 1,
      nombre: "Nombre",
      apellido: "Apellido",
      email: "email@ejemplo.com",
      password: "tu_contraseña",
      telefono: "123456789",
      rol: "rol_aqui",
      fecha_registro: new Date(),
      progresos: [],
      clases: [],
      clases_apuntadas: [],
      notificaciones: [],
      fechaRegistro: new Date(),
      clasesApuntadas: []
    };

    this.userData.member.push(newMember); // Agrega el nuevo miembro al array
  }

  openImageModal(imageUrl: string, title: string) {
    this.selectedImage = {
      url: imageUrl,
      title: title,
      description: 'Imagen de perfil del usuario'
    };
  }

  closeImageModal() {
    this.selectedImage = null;
  }

  editProfile() {
    this.router.navigate(['/editProfile']);
  }

  cerrarSesion() {
    // Eliminar datos de sesión
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    localStorage.setItem('userType', 'invitado');
    
    // Redirigir al home
    this.router.navigate(['/home']).then(() => {
      // Recargar la página para que se actualice el header
      window.location.reload();
    });
  }
}
