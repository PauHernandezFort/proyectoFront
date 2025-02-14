import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.interface';
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
  userData: User | null = null;
  selectedImage: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Recuperar los datos del usuario del localStorage
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }
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
