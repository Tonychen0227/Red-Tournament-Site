import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  
  user: User = {} as User;
  
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.checkAuthStatus().subscribe({
      next: (user) => {
        this.user = user;        
      },
      error: (err) => {
        console.error('Error fetching authentication status:', err);
      }
    });
  }

  updateTimezone(timezone: string) {
    this.userService.updateTimezone(timezone).subscribe(
      response => {
        console.log('Timezone updated:', response);
      },
      error => {
        console.error('Error updating timezone:', error);
      }
    );
  }

  updateDisplayName(displayName: string) {
    this.userService.updateDisplayName(displayName).subscribe(
      response => {
        console.log('Display name updated:', response);
        this.authService.checkAuthStatus(true).subscribe();
      },
      error => {
        console.error('Error updating display name:', error);
      }
    );
  }

  updateSettings() {
    if (this.user) {
      const { displayName, timezone } = this.user;
  
      const observables = [];
  
      if (timezone) {
        observables.push(this.userService.updateTimezone(timezone));
      }
  
      if (displayName) {
        observables.push(this.userService.updateDisplayName(displayName));
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
            window.location.reload();
          }
        });
      }
    }
  }
  
}