import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule, DatePipe } from '@angular/common';

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
export class NavbarComponent implements OnInit {
  
  user: any = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.checkAuthStatus().subscribe(user => {
      this.user = user;      
    });
  }

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
