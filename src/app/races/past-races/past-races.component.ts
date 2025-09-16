import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Race } from '../../interfaces/race';
import { RaceService } from '../../services/race.service';
import { LoadingComponent } from "../../loading/loading.component";
import { TournamentService } from '../../services/tournament.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-past-races',
  standalone: true,
  imports: [
    DatePipe,
    LoadingComponent,
    RouterLink,
    CommonModule,
    FormsModule
],
  templateUrl: './past-races.component.html',
  styleUrl: './past-races.component.css'
})
export class PastRacesComponent {

  constructor(private raceService: RaceService, private tournamentService: TournamentService) {}
  
  loading: boolean = true;
  use24HourFormat: boolean = false;

  races: Race[] = [];
  filteredRaces: Race[] = [];
  
  currentRound: string = 'All';
  
  rounds: string[] = ['Round 1', 'Round 2', 'Round 3', 'Quarterfinals', 'Semifinals', 'Final', 'All'];

  ngOnInit(): void {
    this.loadTimeFormatPreference();
    this.tournamentService.getCurrentRound().subscribe((data: any) => {
      this.currentRound = data.currentRound || 'All';
      this.fetchRaces();
    });
  }

  loadTimeFormatPreference(): void {
    const saved = localStorage.getItem('timeFormat24Hour');
    this.use24HourFormat = saved === 'true';
  }

  onTimeFormatChange(): void {
    localStorage.setItem('timeFormat24Hour', this.use24HourFormat.toString());
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
    if (race.bracket === 'Semifinals' || race.bracket === "Quarterfinals" || race.bracket === 'Final') {
      return 'bg-primary';
    } else {
      switch (race.bracket) {
        case 'Playoffs':
          return 'bg-primary';
        case 'Ascension':
          return 'bg-success';
        case 'Normal':
          return 'bg-info';
        case 'Exhibition':
          return 'bg-dark';
        default:
          return 'bg-secondary';
      }
    }
  }

  getTimeFormat(): string {
    return this.use24HourFormat ? 'HH:mm' : 'h:mm a';
  }

  getShortTimeFormat(): string {
    return this.use24HourFormat ? 'HH:mm' : 'shortTime';
  }
}
