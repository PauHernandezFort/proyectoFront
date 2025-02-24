import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Usuarios } from '../../models/user.interface';

@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent {
  @Input() user!: Usuarios;
  @Input() photo: string = "";
  @Input() isLoading: boolean = false;
  @Input() userType: 'alumno' | 'entrenador' = 'alumno';
  @Output() onDelete = new EventEmitter<number>();

  deleteUser() {
    if (this.user.id) {
      this.onDelete.emit(this.user.id);
    }
  }
}
