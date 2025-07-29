import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Race } from '../../interfaces/race';
import { RaceService } from '../../services/race.service';
import { LoadingComponent } from "../../loading/loading.component";
import { TournamentService } from '../../services/tournament.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-past-races',
  standalone: true,
  imports: [
    DatePipe,
    LoadingComponent,
    RouterLink,
    CommonModule
],
  templateUrl: './past-races.component.html',
  styleUrl: './past-races.component.css'
})
export class PastRacesComponent {

  constructor(private raceService: RaceService, private tournamentService: TournamentService) {}
  
  loading: boolean = true;

  races: Race[] = [];
  filteredRaces: Race[] = [];
  
  currentRound: string = 'All';
  
  rounds: string[] = ['Seeding', 'Round 1', 'Round 2', 'Round 3', 'Semifinals', 'Final', 'All'];

  ngOnInit(): void {
    this.tournamentService.getCurrentRound().subscribe((data: any) => {
      this.currentRound = data.currentRound || 'All';
      this.fetchRaces();
    });
  }

  fetchRaces(): void {
    this.raceService.getCompletedRaces().subscribe(
      (races: Race[]) => {
        this.races = races;
        this.filterRacesByRound(this.currentRound);        
        this.loading = false;        
      },
      (error) => {
        console.error('Error fetching completed races:', error);
      }
    );
  }

  filterRacesByRound(round: string): void {
    if (round === 'All') {
      this.filteredRaces = this.races;
    } else {
      this.filteredRaces = this.races.filter(race => race.round === round);     
    }
  }

  onRoundSelected(round: string): void {
    this.currentRound = round;
    this.filterRacesByRound(round);
  }

  getBadgeClass(race: any, racer: any): string {
    if (race.bracket === 'Seeding') {
      switch (racer.initialPot) {
        case '1':
          return 'bg-primary';
        case '2':
          return 'bg-success';
        case '3':
          return 'bg-info';
        default:
          return 'bg-secondary';
      }
    } else if (race.bracket === 'Semifinals') {
      switch (racer.currentBracket) {
        case 'High':
          return 'bg-primary';
        case 'Middle':
          return 'bg-success';
        case 'Low':
          return 'bg-info';
        default:
          return 'bg-secondary';
      }
    } else if (race.bracket === 'Final') {
      return 'bg-primary';
    } else {
      switch (race.bracket) {
        case 'High':
          return 'bg-primary';
        case 'Middle':
          return 'bg-success';
        case 'Low':
          return 'bg-info';
        default:
          return 'bg-secondary';
      }
    }
  }
}
