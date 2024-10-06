import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { TournamentService } from '../services/tournament.service';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent
  ],
  templateUrl: './standings.component.html',
  styleUrl: './standings.component.css'
})
export class StandingsComponent implements OnInit {

  loading = true;
  errorMessage: string | null = null;

  runners: User[] = [];

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    this.fetchStandings();
  }

  fetchStandings(): void {
    this.tournamentService.getStandings().subscribe({
      next: (data) => {
        this.runners = data;
        this.loading = false;        
      },
      error: (err) => {
        this.errorMessage = 'Error fetching standings';
        this.loading = false;
        console.error('Error:', err);
      },
    });
  }

  clearAlert(): void {
    this.errorMessage = null;
  }
}
