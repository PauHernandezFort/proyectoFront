import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrouselComponent } from "../../components/carrousel/carrousel.component";
import { JumbotronComponent } from "../../components/jumbotron/jumbotron.component";
import { CardsComponent } from "../../components/cards-activities/cards.component";
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarrouselComponent, JumbotronComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isSpanish: boolean = true;

  constructor(private languageService: LanguageService) {
    this.languageService.isSpanish$.subscribe(
      isSpanish => this.isSpanish = isSpanish
    );
  }

  getText(es: string, en: string): string {
    return this.isSpanish ? es : en;
  }
}
