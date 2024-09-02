import { Component } from '@angular/core';
import { RunnersService } from '../services/runners.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  user: any = null;
  runners: any[] = [];

  constructor(private authService: AuthService, private runnersService: RunnersService) { }

  ngOnInit(): void {
    this.getRunners();

    this.authService.checkAuthStatus().subscribe(user => {
      this.user = user;
    });
  }

  getRunners(): void {
    this.runnersService.getRunners().subscribe(
      (data) => {
        this.runners = data;
      },
      (error) => {
        console.error('Error fetching runners:', error);
      }
    );
  }
}
