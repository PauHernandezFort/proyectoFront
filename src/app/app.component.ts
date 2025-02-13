import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { HeaderMisterComponent } from "./components/header-mister/header-mister.component";
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HeaderUserComponent, HeaderMisterComponent, HeaderAdminComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front';
  public isUserRegistered: string = "invitado";
  public isUserRegistered: string = "alumno";

  ngOnInit() {
    // Verificar el estado de autenticación al iniciar
    //this.isUserRegistered = localStorage.getItem('isUserRegistered') === 'true';
    //this.isUserRegistered = localStorage.getItem('isUserRegistered') === 'true';
  }
}
