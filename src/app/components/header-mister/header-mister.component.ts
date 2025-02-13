import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header-mister',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header-mister.component.html',
  styleUrls: ['./header-mister.component.css']
})
export class HeaderMisterComponent {
}
