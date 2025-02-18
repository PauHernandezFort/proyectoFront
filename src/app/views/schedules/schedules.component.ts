import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateClassComponent } from "../../components/forms/create-class/create-class.component";
import { AddMartialArtComponent } from "../../components/forms/add-martial-art/add-martial-art.component";


@Component({
  selector: 'app-calendario-view',
  standalone: true,
  imports: [CommonModule, AddMartialArtComponent],
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class schedulesComponent {
  public showTableHailFirst: boolean = true;
  public onChangeHall(event: any) {
    this.showTableHailFirst = event.target.value === 'horario1';
  }
  dias = signal(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']);
  horarios = computed(() => {
    let horas = [];
    for (let hora = 8; hora < 22; hora++) {
      horas.push(`${hora}:00 - ${hora + 1}:00`);
    }
    return horas;
  });

  artesMarciales :{ name: string, dia: string, horario: string }[] = [];
  
  public name: string = "";
  public dia: string = "";
  public horario: string = "";

  getMartialArt(event: { name: string; dia: string; horario: string; }) {
    alert(`Arte marcial: ${event.name}, Día: ${event.dia}, Horario: ${event.horario}`);
    this.name = event.name;
    this.dia = event.dia;
    this.horario = event.horario;
    this.artesMarciales.push(event);
    console.log(this.artesMarciales);

  }

  getClase(dia: string, horario: string): string | null {
    const claseEncontrada = this.artesMarciales.find(clase => clase.dia === dia && clase.horario === horario);
    return claseEncontrada ? claseEncontrada.name : null;
  }
  

}