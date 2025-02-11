import { Component, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})export class CardsComponent implements AfterViewInit {
  
  ngAfterViewInit() {
    const swiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      slidesPerView: 3, // Change default to 3 (or based on your design)
      spaceBetween: 20, // Space between cards
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        620: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        680: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        920: {
          slidesPerView: 3, // Show 3 cards from 920px screen width
          spaceBetween: 30,
        },
        1240: {
          slidesPerView: 4, // Show 4 cards on larger screens
          spaceBetween: 40,
        },
      }
    });
  }
}
