import { Component } from '@angular/core';
import { RaceService } from '../../services/race.service';
import { Race } from '../../../interfaces/race';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../../loading/loading.component';
import { User } from '../../../interfaces/user';
import { AuthService } from '../../services/auth.service';

import moment from 'moment'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upcoming-races',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    RouterLink,
    LoadingComponent
  ],
  templateUrl: './upcoming-races.component.html',
  styleUrl: './upcoming-races.component.css'
})
export class UpcomingRacesComponent {

  constructor(private raceService: RaceService, private authService: AuthService) {}

  loading: boolean = true;
  
  errorMessage: string | null = null;

  user: User | null = null; 
  userTimezoneLabel: string = '';

  races: Race[] = [];
  
  ngOnInit(): void {
    this.setUserTimezoneLabel();
    this.getRaces();
    this.getUser();
  }

  setUserTimezoneLabel() {
    const offsetMinutes = new Date().getTimezoneOffset();
    const hours = Math.abs(offsetMinutes / 60);
    const minutes = Math.abs(offsetMinutes % 60);
    const sign = offsetMinutes > 0 ? '-' : '+';
  
    this.userTimezoneLabel = `UTC${sign}${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }

  getUser() {
    this.authService.checkAuthStatus().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        console.error('Error fetching authentication status:', err);
      }
    });
  }

  getRaces(): void {
    this.raceService.getUpcomingRaces().subscribe(
      (races: Race[]) => {
        this.races = races;        
        this.loading = false;        
      },
      (error) => {
        this.errorMessage = "Error! Please try again later or contact @organizers on Discord";
        this.loading = false;
      }
    );
  }

  signUpToCommentate(raceId: string): void {
    this.raceService.signUpAsCommentator(raceId).subscribe(
      (response) => {
        this.getRaces();
      },
      (error) => {
        console.error('Error signing up as commentator:', error);
      }
    );
  }

  isUserCommentator(race: any): boolean {
    return race.commentators.some((commentator: any) => commentator._id === this.user?._id);
  }

  pullOutFromCommentary(raceId: string) {
    this.raceService.removeCommentator(raceId).subscribe(
      response => {
        this.getRaces();
      },
      error => {
        this.errorMessage = "Error! Please try again later or contact @organizers on Discord";
      }
    );
  }

  signUpForRestream(raceId: string): void {
    const race = this.races.find(r => r._id === raceId);
    if (race && race.restreamChannel) {
      this.raceService.signUpForRestream(raceId, race.restreamChannel).subscribe({
        next: (response) => {
          console.log('Restream planned successfully');
          this.getRaces();
        },
        error: (err) => {
          console.error('Failed to plan restream', err);
          this.errorMessage = 'Error planning restream. Please try again later.';
        }
      });
    }
  }

  cancelRestream(raceId: string): void {
    this.raceService.cancelRaceRestream(raceId).subscribe({
      next: (response) => {
        this.getRaces();
      },
      error: (err) => {
        console.error('Failed to cancel restream', err);
        this.errorMessage = 'Error canceling restream. Please try again later.';
      }
    });
  }

  timeUntilRace(raceDateTime: number): string {
    return moment(raceDateTime * 1000).fromNow();
  }
}