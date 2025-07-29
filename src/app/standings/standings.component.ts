import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
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

  cutoffRank: number = 0;

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    this.fetchStandings();
  }

  fetchStandings(): void {
    this.tournamentService.getStandings().subscribe({
      next: (data) => {
        const { rankedRunners, cutoffRank } = this.computeRanks(data);

        this.runners = rankedRunners;
        this.cutoffRank = cutoffRank;
        
        this.loading = false;           
      },
      error: (err) => {
        this.errorMessage = 'Error fetching standings';
        this.loading = false;
        console.error('Error:', err);
      },
    });
  }

  computeRanks(runners: User[]): { rankedRunners: User[]; cutoffRank: number } {
    if (!runners || runners.length === 0) {
      return { rankedRunners: [], cutoffRank: 0 };
    }

    // Sort runners by points descending, then by tiebreaker descending
    runners.sort((a, b) => {
      const pointsA = a.points ?? 0;
      const pointsB = b.points ?? 0;
      const tieA = a.tieBreakerValue ?? 0;
      const tieB = b.tieBreakerValue ?? 0;

      if (pointsB !== pointsA) {
        return pointsB - pointsA;
      }
      return tieB - tieA;
    });

    let currentRank = 1;
    const firstRunner = runners[0];
    firstRunner.rank = currentRank;
    let previousPoints = firstRunner.points ?? 0;
    let previousTieBreaker = firstRunner.tieBreakerValue ?? 0;

    for (let i = 1; i < runners.length; i++) {
      const runner = runners[i];
      const currentPoints = runner.points ?? 0;
      const currentTieBreaker = runner.tieBreakerValue ?? 0;

      if (
        currentPoints === previousPoints &&
        currentTieBreaker === previousTieBreaker
      ) {
        runner.rank = currentRank; // Same rank for tied runners
      } else {
        currentRank = i + 1; // Increment rank based on position
        runner.rank = currentRank;
        previousPoints = currentPoints;
        previousTieBreaker = currentTieBreaker;
      }
    }

    // Determine the cutoff rank for the top 9
    let cutoffRank = 0;
    for (let i = 0; i < runners.length; i++) {
      if (runners[i].rank <= 9) {
        cutoffRank = runners[i].rank;
      } else {
        break;
      }
    }

    // Adjust for ties: include all runners with rank equal to cutoffRank
    for (let i = 0; i < runners.length; i++) {
      if (runners[i].rank === cutoffRank) {
        cutoffRank = runners[i].rank;
      } else if (runners[i].rank > cutoffRank) {
        break;
      }
    }

    return { rankedRunners: runners, cutoffRank };
  }

  clearAlert(): void {
    this.errorMessage = null;
  }
}
