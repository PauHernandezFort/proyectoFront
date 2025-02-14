import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../../../services/api-service.service';

@Component({
  selector: 'app-next-pay',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './next-pay.component.html',
  styleUrl: './next-pay.component.css'
})
export class NextPayComponent {
  nextPay = new FormGroup({
    payName: new FormControl('', Validators.required),
    payDate: new FormControl('', Validators.required),
    payMoney: new FormControl('', Validators.required),

});

constructor(public apiService: ApiServiceService) {}

onSubmit() {
  console.log('Formulario enviado');
  console.log('Validez del formulario:', this.nextPay.valid);
  
  if (this.nextPay.valid) {
    alert('Pago creado con éxito');
  } else {
    alert('Por favor, completa todos los campos correctamente');
  }

}


/*
onSubmit2() {
  if(this.nextPay.valid){
    const formData = this.nextPay.value;
    this.apiService.createMoney(formData).subscribe({
      next: (response) => {
        console.log('Pago creado:', response);
        alert('Pago creado con éxito');
      },
      error: (error) => {
        console.error('Error al crear el pago:', error);
        alert('Hubo un error al crear el pago');
      }
    });
}


}*/

}