import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Usuarios } from '../../models/user.interface';

@Component({
  selector: 'app-header-user',
  imports: [RouterLink, /*CalendarComponent*/],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent implements OnInit {
  userData?: Usuarios | null;

  constructor(private router: Router) { }

  ngOnInit() {
    const userDataString = localStorage.getItem('userData');
    console.log(userDataString);
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
      console.log(this.userData?.rol);
    }
  }

  logout() {
    // Eliminar datos de sesión
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    localStorage.setItem('userType', 'invitado');
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }
}
