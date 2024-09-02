import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  
  user: any = null;

  constructor(private authService: AuthService) { }

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
}
