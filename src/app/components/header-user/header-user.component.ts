import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Usuarios } from '../../models/user.interface';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-header-user',
  imports: [RouterLink, /*CalendarComponent*/],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent implements OnInit {
  userData: Usuarios | null = null;

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
