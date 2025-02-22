import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface ActivityCard {
  title: string;
  description: string;
  imageUrl: string;
  routerLink: string;
}

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  @Input() activities: ActivityCard[] = [
    {
      title: 'Capoeira',
      description: '¡Conoce el ritmo de Brasil! Combina danza, acrobacia y artes marciales para mejorar tu agilidad y energía.',
      imageUrl: '../../../../images/capoeira.jpg',
      routerLink: '/activities/capoeira'
    },
    {
      title: 'MMA',
      description: '¡Desafía tus límites! Aprende técnicas de boxeo, lucha y jiu-jitsu en un ambiente seguro y lleno de acción.',
      imageUrl: '../../../../images/mma cards.jpg',
      routerLink: '/activities/mma'
    },
    {
      title: 'Jiu-Jitsu',
      description: '¿Te gustaría dominar el combate? Practica técnicas de sumisión y control en el suelo para tu defensa personal.',
      imageUrl: '../../../../images/jui-jitsu.jpg',
      routerLink: '/activities/jui-jitsu'
    },
     {
      title: 'Saco de boxeo',
      description: '¡Golpea con fuerza! Mejora tu resistencia, coordinación y fuerza mientras te diviertes con el saco de boxeo.',
      imageUrl: '../../../../images/saco.jpg',
      routerLink: '/activities/saco-boxeo'
    },
    {
      title: 'Defensa femenina',
      description: '¡Empoderate! Aprende autodefensa adaptada a las mujeres y siente mayor seguridad y confianza en ti misma.',
      imageUrl: '../../../../images/defensa femenina.jpg',
      routerLink: '/activities/defensa-femenina'
    },
    {
      title: 'Chi-Kung',
      description: 'Relaja tu cuerpo y mente. Practica Chi-Kung y encuentra el equilibrio con movimientos suaves y respiración profunda.',
      imageUrl: '../../../../images/chi-kung.jpg',
      routerLink: '/activities/chi-kung'
    },
  ];

}