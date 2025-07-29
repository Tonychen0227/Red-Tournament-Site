import { Component } from '@angular/core';
import { Race } from '../../interfaces/race';
import { AuthService } from '../../services/auth.service';
import { RaceService } from '../../services/race.service';
import { LoadingComponent } from '../../loading/loading.component';
import { DatePipe } from '@angular/common';

import moment from 'moment'; 

@Component({
  selector: 'app-edit-races',
  standalone: true,
  imports: [
    LoadingComponent,
    DatePipe
  ],
  templateUrl: './edit-races.component.html',
  styleUrl: './edit-races.component.css'
})
export class EditRacesComponent {

  constructor(private raceService: RaceService, private authService: AuthService) {}

  loading: boolean = true;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  races: Race[] = [];

  ngOnInit(): void {
    this.getRaces();
  }

  getRaces(): void {
    this.raceService.getUpcomingRaces().subscribe(
      (races: Race[]) => {
        this.races = races;        
        this.loading = false;        
      },
      () => {
        this.errorMessage = "Error! Please try again later or contact LegendEater";
        this.loading = false;
      }
    );
  }

  cancelRace(raceId: string): void {
    this.raceService.cancelRace(raceId).subscribe({
      next: () => {
        this.getRaces();
      },
      error: (error) => {
        console.error('Error cancelling race:', error);
        this.errorMessage = 'Error cancelling race. Please try again later.';
      }
  });
  }

  uncancelRace(raceId: string): void {
    this.raceService.uncancelRace(raceId).subscribe({
      next: () => {
        this.getRaces();
      },
      error: (error) => {
        console.error('Error uncancelling race:', error);
        this.errorMessage = 'Error uncancelling race. Please try again later.';
      }
  });
  }

  timeUntilRace(raceDateTime: number): string {
    return moment(raceDateTime * 1000).fromNow();
  }
}