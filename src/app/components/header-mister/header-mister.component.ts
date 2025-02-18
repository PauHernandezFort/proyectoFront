import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Pupils } from '../../interfaces/user.interface';

@Component({
  selector: 'app-header-mister',
  imports: [RouterLink],
  templateUrl: './header-mister.component.html',
  styleUrl: './header-mister.component.css'
})
export class HeaderMisterComponent implements OnInit {
  userData: Pupils | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }
  }

  logout() {
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    localStorage.setItem('userType', 'invitado');
    
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }
}
