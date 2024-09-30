import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { RaceService } from '../services/race.service';
import { Race } from '../../interfaces/race';
import { LoadingComponent } from '../loading/loading.component';
import moment from 'moment'; 

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    DatePipe,
    TitleCasePipe,
    LoadingComponent,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  loading: boolean = true;
  
  user: any = null;

  racesParticipatedIn: Race[] = [];
  racesCommentated: Race[] = [];

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private raceService: RaceService) { }

  ngOnInit(): void {
    this.authService.checkAuthStatus().subscribe(user => {
      this.user = user;
    });

    this.getUserRaces();
  }

  getUserRaces(): void {
    this.raceService.getUserRaces().subscribe({
      next: (data) => {
        this.racesParticipatedIn = data.racesParticipatedIn;
        this.racesCommentated = data.racesCommentated;
        
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error fetching user races';
        console.error(error);
        this.loading = false;
      }
    });
  }
}