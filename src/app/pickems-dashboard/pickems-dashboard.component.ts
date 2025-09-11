import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PickemsTournamentComponent } from './pickems-tournament/pickems-tournament.component';
import { PickemsService } from '../services/pickems.service';
import { LoadingComponent } from '../loading/loading.component';
import { Pickems } from '../interfaces/pickems';

@Component({
  selector: 'app-pickems-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    PickemsTournamentComponent,
    LoadingComponent
  ],
  templateUrl: './pickems-dashboard.component.html',
  styleUrl: './pickems-dashboard.component.css'
})
export class PickemsDashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private pickemsService: PickemsService,
  ) {}

  loading: boolean = true;

  user: User | null = null; 
  pickems: Pickems | null = null;


  ngOnInit(): void {
    this.authService.checkAuthStatus().subscribe({
      next: (user) => {
        this.user = user;

        if (user) {
          this.checkPickems();
        } else {
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Error fetching authentication status:', err);
      }
    });
  }

  checkPickems() {
    this.pickemsService.checkPickems().subscribe({
      next: (pickems) => {
        this.pickems = pickems;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching Pickems:', err);
        this.loading = false;
      }
    });
  }

  login(): void {
    this.authService.login();
  }
}