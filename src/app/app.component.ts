import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { HeaderMisterComponent } from './components/header-mister/header-mister.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
//import { CarrouselComponent } from './components/carrousel/carrousel.component';
//import { CalendarComponent } from './components/calendar/calendar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    //CarrouselComponent,
    FooterComponent,
    //CalendarComponent,
    HeaderUserComponent,
    HeaderMisterComponent,
    HeaderAdminComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  title = 'front';
  public isUserRegistered: string = "invitado";

  ngOnInit() {
    // Verificar el estado de autenticación al iniciar
    const userType = localStorage.getItem('userType');
    this.isUserRegistered = userType || "invitado";
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    this.isUserRegistered = "invitado";
  }
}