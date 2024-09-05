import { Component } from '@angular/core';
import { RaceService } from '../../services/race.service';
import { Race, RaceResult } from '../../../interfaces/race';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-races-awaiting-completion',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    RouterLink
  ],
  templateUrl: './races-awaiting-completion.component.html',
  styleUrl: './races-awaiting-completion.component.css'
})
export class RacesAwaitingCompletionComponent {
  races: Race[] = [];
  raceResults: { [key: string]: RaceResult[] } = {};

  constructor(private raceService: RaceService) {}

  ngOnInit(): void {
    this.getRaces();
  }

  getRaces(): void {
    this.raceService.getRacesReadyForCompletion().subscribe(
      (races: Race[]) => {
        this.races = races;
        this.initializeResults();
      },
      (error) => {
        console.error('Error fetching races:', error);
      }
    );
  }

  initializeResults(): void {
    this.races.forEach((race) => {
      this.raceResults[race._id] = [
        { racer: race.racer1, status: 'Finished', finishTime: { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 } },
        { racer: race.racer2, status: 'Finished', finishTime: { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 } },
      ];

      if (race.racer3) {
        this.raceResults[race._id].push({
          racer: race.racer3,
          status: 'Finished',
          finishTime: { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
        });
      }
    });
  }

  // Handle form submission for completing the race
  completeRace(raceId: string): void {
    const results = this.raceResults[raceId];

    this.raceService.completeRace(raceId, results).subscribe(
      (response) => {
        console.log('Race completed successfully', response);
      },
      (error) => {
        console.error('Error completing race:', error);
      }
    );
  }
}