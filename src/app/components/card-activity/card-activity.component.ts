import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-card-activity',
  imports: [],
  templateUrl: './card-activity.component.html',
  styleUrl: './card-activity.component.css'
})

export class CardActivityComponent {
@Input() nombre: string =  '';
@Input() photo: string =  '';
@Input() descripcion: string =  '';
}
