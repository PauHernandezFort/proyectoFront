import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { HeaderMisterComponent } from './components/header-mister/header-mister.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HeaderUserComponent,
    HeaderMisterComponent,
    HeaderAdminComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isUserRegistered: string | null = null;

  ngOnInit() {
    this.actualizarEstadoUsuario();
    
    window.addEventListener("storage", () => {
      this.actualizarEstadoUsuario();
    });
  }

  private actualizarEstadoUsuario() {
    const userType = localStorage.getItem('userType');
    this.isUserRegistered = userType || null;
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('userData');
    this.isUserRegistered = "invitado";
    window.dispatchEvent(new Event("storage"));
  }
}
