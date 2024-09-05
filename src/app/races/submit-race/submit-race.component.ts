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

  runners: any[] = [];

  raceData: any = {
    date: '',
    time: '',
    racer1: null,
    racer2: null,
    racer3: null
  };

  userTimezone: string = 'UTC';

  constructor(
    private runnersService: RunnersService,
    private raceService: RaceService, 
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
    this.fetchUserName();
    this.fetchRunners();
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
    
    if (!this.raceData.date || !this.raceData.time || !this.raceData.racer2 || !this.raceData.racer3) {
      this.errorMessage = 'All fields are required. Please fill them out and try again.';
      return;
    }
    
    this.raceService.submitRace(this.raceData).subscribe(response => {
      this.successMessage = response.message;
      this.errorMessage = '';
      
      // Redirect to the individual race page using the returned race ID
      setTimeout(() => {
        //this.router.navigate(['/race', response.id]); // Redirect to the race's page
        }, 2000); // 2 seconds
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