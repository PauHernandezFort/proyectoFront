import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { CardsComponent } from './components/cards/cards.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,CarrouselComponent,FooterComponent,JumbotronComponent,CardsComponent, HeaderUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
  public isUserRegistered: boolean = false;
}
