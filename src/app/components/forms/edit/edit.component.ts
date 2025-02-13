import { Component } from '@angular/core';

@Component({
  selector: 'app-edit',
  imports: [],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  public photoImage: string = 'https://www.lavanguardia.com/files/og_thumbnail/uploads/2021/03/05/60421be64918d.jpeg';

  previewImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photoImage = reader.result as string;  // Actualizamos la imagen
      };
      reader.readAsDataURL(file);  // Leemos el archivo como una URL de datos
    }
  }

}
