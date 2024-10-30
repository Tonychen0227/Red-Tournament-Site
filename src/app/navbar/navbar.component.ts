import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Globals } from '../services/globals';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {  

  constructor(public globals: Globals, private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login();
  }

  logout(): void {  
    this.authService.logout();
  }

  isRacesActive(): boolean {    
    return this.router.isActive('/races', false);
  }
}