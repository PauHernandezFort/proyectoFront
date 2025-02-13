import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HeaderUserComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front';
  isUserRegistered: boolean = false;

  ngOnInit() {
    // Verificar el estado de autenticación al iniciar
    this.isUserRegistered = localStorage.getItem('isUserRegistered') === 'true';
  }
}
