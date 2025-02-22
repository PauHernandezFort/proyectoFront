import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cards-events',
  imports: [],
  templateUrl: './cards-events.component.html',
  styleUrls: ['./cards-events.component.css']
})
export class CardsEventsComponent {
  @Input() nombre: string = '';
  @Input() descripcion: string = '';
  @Input() fecha: string = '';
  @Input() capacidad: number = 0;
  @Input() ubicacion?: string = "";
  @Input() estado: string = '';
  @Input() id?: number;
  @Input() entrenador: string = '';
  @Output() data = new EventEmitter<{ id?: number, descripcion: string, capacidad: number, ubicacion?: string, fecha: string, entrenador: string }>();

  onClick() {
    this.data.emit({
      id: this.id,
      descripcion: this.descripcion,
      capacidad: this.capacidad,
      ubicacion: this.ubicacion,
      fecha: this.fecha,
      entrenador: this.entrenador
    });
  }
}