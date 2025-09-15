import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { RaceService } from '../services/race.service';
import { Race } from '../interfaces/race';
import { LoadingComponent } from '../loading/loading.component';
import { PickemsService } from '../services/pickems.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Pickems } from '../interfaces/pickems';
import { CountryFlagComponent } from '../country-flag/country-flag.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    DatePipe,
    TitleCasePipe,
    LoadingComponent,
    CommonModule,
    CountryFlagComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  loading: boolean = true;
  
  user: any = null;

  racesParticipatedIn: Race[] = [];
  racesCommentated: Race[] = [];

  pickems: Pickems | null = null;

  errorMessage: string | null = null;

  constructor(
    private authService: AuthService, 
    private userService: UserService, 
    private raceService: RaceService, 
    private pickemsService: PickemsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const discordUsername = params.get('discordUsername');

      if (discordUsername) {
        this.fetchUserProfile(discordUsername);
      } else {
        this.authService.checkAuthStatus().subscribe({
          next: (user) => {
            if (user) {
              this.user = user;
              this.getUserRaces(user._id);
              this.getUserPickems(user._id);
            } else {
              // User is not authenticated
              this.errorMessage = 'Please log in to view your profile';
            }
            this.loading = false;
          }
        });
      }
    });
  }

  fetchUserProfile(discordUsername: string): void {
    this.userService.getUserByDiscordUsername(discordUsername).subscribe({
      next: (userData) => {
        this.user = userData;

        this.getUserRaces(userData._id);
        this.getUserPickems(userData._id);
      },
      error: (error) => {
        this.errorMessage = 'No user found with that Discord username';
        this.loading = false;
      }
    });
  }

  getUserRaces(userId: string): void {
    this.raceService.getRacesByUserId(userId).subscribe({
      next: (data) => {
        this.racesParticipatedIn = data.racesParticipatedIn;
        this.racesCommentated = data.racesCommentated;
      }
    });
  }

  getUserPickems(userId: string): void {
    this.pickemsService.getPickemsByUserId(userId).subscribe({
      next: (data) => {
        this.pickems = data;
        this.loading = false;        
      }
    });
  }

  formatTime(milliseconds: number): string {
    const ms = milliseconds % 1000;
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    return `${hours}h ${minutes}m ${seconds}s ${ms}ms`;
  } 
}