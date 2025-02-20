import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards-progress',
  imports: [],
  templateUrl: './cards-progress.component.html',
  styleUrl: './cards-progress.component.css'
})
export class CardsProgressComponent {
  @Input() description: string = "";
  @Input() dateProgress: string = "";
  @Input() namePupil: string = "Alberto";
  @Input() photo = "url('https://frutasolivar.com/wp-content/uploads/2019/02/rawpixel-603025-unsplash-e1579691765526.jpg')";
}
