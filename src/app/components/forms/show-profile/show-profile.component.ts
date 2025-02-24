import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Usuarios } from '../../../models/user.interface';
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
  userData: Usuarios | null = null;
  selectedImage: any = null;

  constructor(private router: Router) { }

  ngOnInit() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
      console.log('Datos del usuario cargados:', this.userData);
    } else {
      console.log('No hay datos de usuario en localStorage');
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
    const userType = localStorage.getItem('userType');
    if (this.userData?.id) {
      if (userType === 'alumno') {
        this.router.navigate(['/editUser', this.userData.id]);
      } else if (userType === 'entrenador') {
        this.router.navigate(['/editTrainer', this.userData.id]);
      }
    }
  }

  cerrarSesion() {
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    localStorage.setItem('userType', 'invitado');
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }
}
