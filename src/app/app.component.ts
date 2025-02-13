import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { HeaderMisterComponent } from "./components/header-mister/header-mister.component";
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HeaderUserComponent, HeaderMisterComponent, HeaderAdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
  public isUserRegistered: string = "admin";
}
