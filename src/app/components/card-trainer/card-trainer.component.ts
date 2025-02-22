import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Usuarios } from '../../models/user.interface';

@Component({
  selector: 'app-card-trainer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card-trainer.component.html',
  styleUrls: ['./card-trainer.component.css']
})
export class CardTrainerComponent {
  @Input() user!: Usuarios;
  @Input() isLoading: boolean = false;
  @Output() onDelete = new EventEmitter<number>();

  deleteUser() {
    if (this.user.id) {
      this.onDelete.emit(this.user.id);
    }
  }
} 