import { Component } from '@angular/core';
import { RaceService } from '../../services/race.service';
import { Race } from '../../../interfaces/race';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-upcoming-races',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './upcoming-races.component.html',
  styleUrl: './upcoming-races.component.css'
})
export class UpcomingRacesComponent {
  constructor(private raceService: RaceService) {}

  races: Race[] = [];
  
  ngOnInit(): void {
    this.getRaces();
  }

  getRaces(): void {
    this.raceService.getUpcomingRaces().subscribe(
      (races: Race[]) => {
        this.races = races;
      },
      (error) => {
        console.error('Error fetching upcoming races:', error);
      }
    );
  }

  signUpToCommentate(raceId: string): void {
    this.raceService.signUpAsCommentator(raceId).subscribe(
      (response) => {
        console.log('Successfully signed up as commentator:', response);
        // Update UI to show the user was added
      },
      (error) => {
        console.error('Error signing up as commentator:', error);
      }
    );
  }
}