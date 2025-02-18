import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Pupils } from '../../interfaces/user.interface';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {
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
