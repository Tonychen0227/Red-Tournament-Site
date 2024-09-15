import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Race } from '../../../interfaces/race';
import { RaceService } from '../../services/race.service';
import { LoadingComponent } from "../../loading/loading.component";

@Component({
  selector: 'app-past-races',
  standalone: true,
  imports: [
    DatePipe,
    LoadingComponent
],
  templateUrl: './past-races.component.html',
  styleUrl: './past-races.component.css'
})
export class PastRacesComponent {

  constructor(private raceService: RaceService) {}

  loading: boolean = true;

  races: Race[] = [];

  ngOnInit(): void {
    this.raceService.getCompletedRaces().subscribe(
      (races: Race[]) => {
        this.races = races;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching completed races:', error);
      }
    );
  }
}
