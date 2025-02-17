import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendario-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class schedulesComponent {
  public showTableHailFirst: boolean = true;

  public onChangeHall(event: any) {
    this.showTableHailFirst = event.target.value === 'horario1';
  }


}