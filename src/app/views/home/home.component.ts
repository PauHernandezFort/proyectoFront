import { Component } from '@angular/core';
import { CarrouselComponent } from "../../components/carrousel/carrousel.component";
import { JumbotronComponent } from "../../components/jumbotron/jumbotron.component";
import { CardsComponent } from "../../components/cards/cards.component";

@Component({
  selector: 'app-home',
  imports: [CarrouselComponent, JumbotronComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
