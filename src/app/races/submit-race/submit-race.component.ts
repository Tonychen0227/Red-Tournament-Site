import { Component } from '@angular/core';
import { RaceService } from '../../services/race.service';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RunnersService } from '../../services/runners.service';

@Component({
  selector: 'app-submit-race',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './submit-race.component.html',
  styleUrl: './submit-race.component.css'
})
export class SubmitRaceComponent {
  successMessage: string = '';
  errorMessage: string = ''

  userName: string = ''; 
  userId: string = '';

  userTimezoneLabel: string = '';

  runners: any[] = [];

  date: string = '';
  time: string = '';

  raceData: any = {
    racer1: null,
    racer2: null,
    racer3: null,
    raceDateTime: null
  };

  userTimezone: string = 'UTC';

  constructor(
    private runnersService: RunnersService,
    private raceService: RaceService, 
    private authService: AuthService) { }

  ngOnInit(): void {    
    this.setUserTimezoneLabel();

    this.fetchUserName();
    this.fetchRunners();
  }

  setUserTimezoneLabel() {
    const offsetMinutes = new Date().getTimezoneOffset();
    const hours = Math.abs(offsetMinutes / 60);
    const minutes = Math.abs(offsetMinutes % 60);
    const sign = offsetMinutes > 0 ? '-' : '+';
  
    this.userTimezoneLabel = `UTC${sign}${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }

  fetchUserName() {
    this.authService.checkAuthStatus().subscribe(user => {
      if (user) {
        this.userName = user.displayName || user.username;
        this.userId = user._id;
        this.raceData.racer1 = user._id;
      } else {
        console.error('User is not authenticated');
      }
    });
  }

  fetchRunners() {
    this.runnersService.getRunners().subscribe(data => {
      // Only show runners that aren't the current user
      this.runners = data.filter((runner: { _id: string; }) => runner._id !== this.userId);        
    }, error => {
      console.error('Error fetching runners:', error);
    });
  }

  submitRace() {
    this.successMessage = '';
    this.errorMessage = '';
  
    // Ensure that both date and time are provided
    if (!this.date || !this.time || !this.raceData.racer2) {
      this.errorMessage = 'All fields are required. Please fill them out and try again.';
      return;
    }
  
    // Combine date and time into a single string
    const combinedDateTime = `${this.date}T${this.time}`;
  
    // Convert to local Date object
    const localDate = new Date(combinedDateTime);
  
    // Convert to UTC Unix timestamp
    const unixTimestamp = Math.floor(localDate.getTime() / 1000);
  
    // Add the Unix timestamp to raceData
    this.raceData.raceDateTime = unixTimestamp;
  
    // Submit the raceData with Unix timestamp
    this.raceService.submitRace(this.raceData).subscribe(response => {
      this.successMessage = response.message;
      this.errorMessage = '';
  
      setTimeout(() => {
        // Redirect to the individual race page using the returned race ID
        //this.router.navigate(['/race', response.id]);
      }, 2000); // 2 seconds delay
    }, error => {
      this.errorMessage = 'Something went wrong. Please try submitting again.';
      this.successMessage = '';
    });
  }

  
  clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }
}