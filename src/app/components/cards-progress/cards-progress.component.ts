import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards-progress',
  imports: [],
  templateUrl: './cards-progress.component.html',
  styleUrl: './cards-progress.component.css'
})
export class CardsProgressComponent {
  @Input() description = "url('https://frutasolivar.com/wp-content/uploads/2019/02/rawpixel-603025-unsplash-e1579691765526.jpg')";
  @Input() dateProgress = new Date();
  @Input() namePupil = "Alberto";
}
