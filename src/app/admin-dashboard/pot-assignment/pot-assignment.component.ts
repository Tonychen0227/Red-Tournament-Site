import { Component, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user';
import { RunnersService } from '../../services/runners.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../loading/loading.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pot-assignment',
  standalone: true,
  imports: [
    LoadingComponent,
    FormsModule
  ],
  templateUrl: './pot-assignment.component.html',
  styleUrl: './pot-assignment.component.css'
})
export class PotAssignmentComponent implements OnInit {

  loading: boolean = true;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  runners: User[] = [];
  potSelections: { [userId: string]: string } = {};

  constructor(private runnersService: RunnersService) {}

  ngOnInit(): void {
    this.fetchRunners();
  }

  fetchRunners(): void {
    this.loading = true;
    this.runnersService.getRunners().subscribe({
      next: (data) => {
        this.runners = data;
        this.initializePotSelections();
        this.loading = false;        
      },
      error: (error) => {
        this.errorMessage = 'Error fetching runners.';
        this.loading = false;
        console.error(error);
      }
    });
  }

  initializePotSelections(): void {
    this.runners.forEach(runner => {
      if (runner._id) {
        this.potSelections[runner._id] = runner.initialPot || '2';
      }
    });
  }

  onPotChange(userId: string, pot: string): void {
    this.potSelections[userId] = pot;
  }

  savePotAssignments(): void {

    this.clearAlert();

    const userPots = Object.keys(this.potSelections).map(userId => ({
      userId,
      pot: this.potSelections[userId]
    }));

    this.runnersService.setInitialPots(userPots).subscribe({
      next: (response) => {
        this.successMessage = "Successfully saved initial pots"
      },
      error: (error) => {
        this.errorMessage = 'Error saving pot assignments.';
        console.error(error);
      }
    });
  }

  clearAlert(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }
}