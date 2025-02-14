import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-header-user',
  imports: [RouterLink],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent implements OnInit {
  userData: User | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }
  }

  logout() {
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
