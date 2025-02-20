import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {
  @Input() userId!: number;
  qrImageUrl: string | null = null;
  loading = true; // Para controlar la carga mostrarlo o no dependiendo si esta cargado

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user'); // Obtener usuario desde LocalStorage
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.id; // Extraer el ID del usuario

      this.loadQrCode();
    }
  }

  loadQrCode(): void {
    if (!this.userId) return;

    this.apiService.getQrCode(this.userId).subscribe(response => {
      const reader = new FileReader();
      reader.onload = () => {
        this.qrImageUrl = reader.result as string;
        this.loading = false;
      };
      reader.readAsDataURL(response);
    });
  }
}
