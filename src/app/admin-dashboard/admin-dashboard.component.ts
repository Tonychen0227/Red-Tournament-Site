import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PickemsService } from '../services/pickems.service';
import { CommonModule } from '@angular/common';

interface PointChange {
  userId: string;
  userDisplayName: string;
  currentPoints: number;
  newPoints: number;
  pointsDifference: number;
  breakdown: { [key: string]: number };
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  isRecalibrating = false;
  isPreviewing = false;
  recalibrateMessage = '';
  pointsChanges: PointChange[] = [];
  showPreview = false;

  constructor(private pickemsService: PickemsService) {}

  previewRecalibrate() {
    this.isPreviewing = true;
    this.recalibrateMessage = '';
    this.pointsChanges = [];
    this.showPreview = false;

    this.pickemsService.previewRecalibratePickems().subscribe({
      next: (response) => {
        this.isPreviewing = false;
        this.pointsChanges = response.changes || [];
        this.showPreview = true;
        this.recalibrateMessage = `Preview complete: ${response.usersWithChanges} of ${response.totalUsers} users will have point changes`;
      },
      error: (error) => {
        this.isPreviewing = false;
        this.recalibrateMessage = 'Error previewing recalibration: ' + (error.error?.message || error.message);
        
        // Clear error message after 5 seconds
        setTimeout(() => {
          this.recalibrateMessage = '';
        }, 5000);
      }
    });
  }

  finalizeRecalibrate() {
    this.isRecalibrating = true;
    this.recalibrateMessage = '';

    this.pickemsService.recalibratePickems().subscribe({
      next: (response) => {
        this.isRecalibrating = false;
        this.showPreview = false;
        this.pointsChanges = [];
        this.recalibrateMessage = `Recalibration complete: ${response.usersWithChanges} of ${response.totalUsers} users had point changes`;
        
        // Clear message after 8 seconds
        setTimeout(() => {
          this.recalibrateMessage = '';
        }, 8000);
      },
      error: (error) => {
        this.isRecalibrating = false;
        this.recalibrateMessage = 'Error finalizing recalibration: ' + (error.error?.message || error.message);
        
        // Clear error message after 5 seconds
        setTimeout(() => {
          this.recalibrateMessage = '';
        }, 5000);
      }
    });
  }

  cancelPreview() {
    this.showPreview = false;
    this.pointsChanges = [];
    this.recalibrateMessage = '';
  }

  getBreakdownEntries(breakdown: { [key: string]: number }): { key: string, value: number }[] {
    return Object.entries(breakdown).map(([key, value]) => ({ key, value }));
  }

  getUsersWithChanges(): number {
    return this.pointsChanges.filter(change => change.pointsDifference !== 0).length;
  }

  hasBreakdownPoints(breakdown: { [key: string]: number }): boolean {
    return Object.keys(breakdown).length > 0;
  }

  // Legacy method for backward compatibility
  recalibratePickems() {
    this.previewRecalibrate();
  }
}
