import { Component, output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-add-martial-art',
  imports: [ReactiveFormsModule],
  templateUrl: './add-martial-art.component.html',
  styleUrl: './add-martial-art.component.css'
})
export class AddMartialArtComponent {
  createMartialArt = new FormGroup({
    nameMartialArt: new FormControl('', Validators.required),
    diaMartialArt: new FormControl('', Validators.required),
    horarioMartialArt: new FormControl('', Validators.required),
  });


  @Output() create = new EventEmitter<any>();

  public toggleCreateMartialArt() {
    const rawValue = this.createMartialArt.getRawValue();
    this.create.emit({ name: rawValue.nameMartialArt, dia: rawValue.diaMartialArt, horario: rawValue.horarioMartialArt });
   // alert('name: ' + rawValue.nameMartialArt + ' dia: ' + rawValue.diaMartialArt + ' horario: ' + rawValue.horarioMartialArt);
  }


  submit() {
    if (this.createMartialArt.valid) {
      alert('arte marcial creada');
    } else {
      alert('error');
    }
  }


}
