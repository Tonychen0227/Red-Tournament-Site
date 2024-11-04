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
        this.runners = this.computeRanks(data);
        this.loading = false;           
      },
      error: (err) => {
        this.errorMessage = 'Error fetching standings';
        this.loading = false;
        console.error('Error:', err);
      },
    });
  }

  computeRanks(runners: User[]): User[] {
    if (!runners || runners.length === 0) {
      return [];
    }

    // Sort runners if not already sorted
    runners.sort((a, b) => {

      if (!a.tieBreakerValue || !b.tieBreakerValue ) {
        return 0;
      }

      if (!a.points || !b.points ) {
        return 0;
      }

      if (b.points !== a.points) {
        return b.points - a.points;
      }

      return b.tieBreakerValue - a.tieBreakerValue;
    });

    let currentRank = 1;
    let previousPoints = runners[0].points;
    let previousTieBreaker = runners[0].tieBreakerValue;
    runners[0].rank = currentRank;

    for (let i = 1; i < runners.length; i++) {
      const runner = runners[i];
      if (
        runner.points === previousPoints &&
        runner.tieBreakerValue === previousTieBreaker
      ) {
        runner.rank = currentRank;
      } else {
        currentRank = i + 1;
        runner.rank = currentRank;
        previousPoints = runner.points;
        previousTieBreaker = runner.tieBreakerValue;
      }
    }   

    return runners;
  }

  clearAlert(): void {
    this.errorMessage = null;
  }
}
