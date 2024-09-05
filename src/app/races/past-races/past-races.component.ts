import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Race } from '../../../interfaces/race';
import { RaceService } from '../../services/race.service';

@Component({
  selector: 'app-past-races',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './past-races.component.html',
  styleUrl: './past-races.component.css'
})
export class PastRacesComponent {

  races: Race[] = [];

  constructor(private raceService: RaceService) {}

  ngOnInit(): void {
    this.raceService.getCompletedRaces().subscribe(
      (races: Race[]) => {
        this.races = races;
      },
      (error) => {
        console.error('Error fetching completed races:', error);
      }
    );
  }
}
