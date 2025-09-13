import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { RunnersService } from '../../services/runners.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PickemsService } from '../../services/pickems.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pickems-tournament',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './pickems-tournament.component.html',
  styleUrl: './pickems-tournament.component.css'
})
export class PickemsTournamentComponent implements OnInit {

  loading: boolean = true;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  runners: User[] = [];

  selectedRunners: (User | null)[] = new Array(27).fill(null);
  ultraSelectedRunners: (User | null)[] = new Array(9).fill(null);
  selectedWinner: User | null = null;
  selectedBestTimeRunner : User | null = null;

  bestTime = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  };

  constructor(
    private runnersService: RunnersService, 
    private pickemsService: PickemsService, 
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchRunners();
  }

  fetchRunners(): void {
    this.loading = true;
    this.runnersService.getRunners().subscribe({
      next: (data) => {
        this.runners = data;
        this.loading = false;        
      },
      error: (error) => {
        this.errorMessage = 'Error fetching runners.';
        this.loading = false;
        console.error(error);
      }
    });
  }

  getAvailableRunners(pickIndex: number): User[] {
    const selectedIds = this.selectedRunners
      .filter((runner: User | null, index: number): runner is User => runner !== null && index !== pickIndex)
      .map((runner: User) => runner._id);
  
    return this.runners.filter(runner => !selectedIds.includes(runner._id));
  }

  getAvailableUltraRunners(pickIndex: number): User[] {
    const selectedIds = this.ultraSelectedRunners
      .filter((runner: User | null, index: number): runner is User => runner !== null && index !== pickIndex)
      .map((runner: User) => runner._id);
  
    return this.runners.filter(runner => !selectedIds.includes(runner._id));
  }
  
  canSubmit(): boolean {
    const allRunnersSelected = this.selectedRunners.every(runner => runner !== null) && this.ultraSelectedRunners.every(runner => runner !== null);
    const winnerSelected = this.selectedWinner !== null;
    const bestTimeRunnerSelected = this.selectedBestTimeRunner !== null;
  
    const bestTimeValid = 
      this.bestTime.hours > 0 &&
      this.bestTime.minutes >= 0 && this.bestTime.minutes <= 59 &&
      this.bestTime.seconds >= 0 && this.bestTime.seconds <= 59 &&
      this.bestTime.milliseconds >= 0 && this.bestTime.milliseconds <= 999;
  
    return allRunnersSelected && winnerSelected && bestTimeRunnerSelected && bestTimeValid;
  }
  
  submitPickems() {
    this.clearAlert();

    const pickemsData = {
      selectedRunners: this.selectedRunners,
      ultraSelectedRunners: this.ultraSelectedRunners,
      selectedWinner: this.selectedWinner,
      selectedBestTimeRunner: this.selectedBestTimeRunner,
      bestTime: this.bestTime
    };
  
    this.pickemsService.submitOneOffPicks(pickemsData).subscribe(
      (response: any) => {
        this.successMessage = 'Pickems submitted successfully.';

        setTimeout(() => {
          this.loading = true;
          this.router.navigate(['/pickems/picks']);
          window.location.reload();
        }, 1000);
      },
      (error) => {
        this.errorMessage = 'Error submitting pickems. Please try again later.';
      }
    );
  }

  validateBestTimeHours(value: number): void {
    if (value < 0) {
      this.bestTime.hours = 2;
    } else if (value > 2) {
      this.bestTime.hours = 0;
    } else {
      this.bestTime.hours = value;
    }
  
    this.cdr.detectChanges();
  }
  
  validateBestTimeMinutes(value: number): void {
    if (value < 0) {
      this.bestTime.minutes = 59;
    } else if (value > 59) {
      this.bestTime.minutes = 0;
    } else {
      this.bestTime.minutes = value;
    }
  
    this.cdr.detectChanges();
  }
  
  validateBestTimeSeconds(value: number): void {
    if (value < 0) {
      this.bestTime.seconds = 59;
    } else if (value > 59) {
      this.bestTime.seconds = 0;
    } else {
      this.bestTime.seconds = value;
    }
  
    this.cdr.detectChanges();
  }
  
  validateBestTimeMilliseconds(value: number): void {
    if (value < 0) {
      this.bestTime.milliseconds = 999;
    } else if (value > 999) {
      this.bestTime.milliseconds = 0;
    } else {
      this.bestTime.milliseconds = value;
    }
  
    this.cdr.detectChanges();
  }
  
  clearAlert(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }
}
