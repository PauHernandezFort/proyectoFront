import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-header-user',
  imports: [RouterLink],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent {

  userData: User | null = null;

  constructor(private router: Router) {}

  logout() {
    // Eliminar datos de sesión
    localStorage.removeItem('userType');
    localStorage.setItem('userType', 'invitado');
    
    // Redirigir al home
    this.router.navigate(['/home']).then(() => {
      // Recargar la página para que se actualice el header
      window.location.reload();
    });
  }
}
