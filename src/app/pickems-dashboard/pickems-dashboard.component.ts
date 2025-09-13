import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PickemsTournamentComponent } from './pickems-tournament/pickems-tournament.component';
import { PickemsService } from '../services/pickems.service';
import { LoadingComponent } from '../loading/loading.component';
import { Pickems } from '../interfaces/pickems';
import { TournamentService } from '../services/tournament.service';

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
    private tournamentService: TournamentService
  ) {}

  loading: boolean = true;

  user: User | null = null; 
  pickems: Pickems | null = null;
  currentRound: string | null = null;


  ngOnInit(): void {
    this.tournamentService.getCurrentRound().subscribe({
      next: (result) => {
        this.currentRound = result.currentRound;
        
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
      },
      error: (err) => {
        console.error('Error fetching current round:', err);
      }
    })
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