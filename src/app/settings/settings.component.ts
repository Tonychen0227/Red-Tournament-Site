import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { forkJoin, interval } from 'rxjs';
import { User } from '../../interfaces/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  
  user: User = {} as User;

  userOffsetMinutes: number = 0;

  currentUtcTime: Date = new Date();
  localTime: Date = new Date();
  
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {

    // Testing
    const now = new Date();
    console.log("New date:", now);

    const nowUtc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    console.log("UTC date:", nowUtc);

    const timezoneOffset = now.getTimezoneOffset();
    console.log("Timezone offset:", timezoneOffset);
    

    // Check auth status to get user data
    this.authService.checkAuthStatus().subscribe({
      next: (user) => {
        this.user = user;

        if (user.timezone !== undefined && user.timezone !== null) {
          this.userOffsetMinutes = Number(user.timezone);
        }

        this.updateTimes();
        
        // Update times every second to keep the display current
        interval(1000).subscribe(() => this.updateTimes());
      },
      error: (err) => {
        console.error('Error fetching authentication status:', err);
      }
    });
  }

  updateTimes(): void {
    // Update current UTC time
    this.currentUtcTime = new Date();

    this.localTime = new Date(
      this.currentUtcTime.getTime() + this.userOffsetMinutes * 60 * 1000 // Convert to milliseconds
    );
  }

  changeOffset(minutes: number): void {
    this.userOffsetMinutes += minutes;
    this.updateTimes(); // Reactively update the times after adjusting the offset
  }
  
  updateSettings() {
    if (this.user) {
      const observables = [];

      // Ensure the value is treated as a number before saving
      const offsetToSave = Number(this.userOffsetMinutes);

      // Update the user's timezone offset in minutes
      observables.push(this.userService.updateTimezone(offsetToSave));

      // If there's a display name change, add it to the update calls
      if (this.user.displayName) {
        observables.push(this.userService.updateDisplayName(this.user.displayName));
      }

      if (observables.length > 0) {
        forkJoin(observables).subscribe({
          next: results => {
            console.log('All updates completed:', results);
          },
          error: error => {
            console.error('Error updating settings:', error);
          },
          complete: () => {
            // Optionally reload or handle UI changes
          }
        });
      }
    }
  }
}