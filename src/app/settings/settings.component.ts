import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { forkJoin, interval } from 'rxjs';
import { User } from '../interfaces/user';
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

  constructor(private authService: AuthService, private userService: UserService) { }

  successMessage: string | null = null;
  errorMessage: string | null = null;

  user: User = {} as User;

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
  
  updateSettings() {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.user) {
      const observables = [];

      if (this.user.displayName) {
        observables.push(this.userService.updateDisplayName(this.user.displayName));
      }

      observables.push(this.userService.updatePronouns(this.user.pronouns || ''));

      if (observables.length > 0) {
        forkJoin(observables).subscribe({
          next: results => {
            this.successMessage = "Changes saved successfully";
          },
          error: error => {
            this.errorMessage = "Error! Changes not saved. Try again later.";

          },
          complete: () => { }
        });
      }
    }
  }
}
