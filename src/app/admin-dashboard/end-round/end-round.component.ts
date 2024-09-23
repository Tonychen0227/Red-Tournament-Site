import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { LoadingComponent } from '../../loading/loading.component';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-end-round',
  standalone: true,
  imports: [
    LoadingComponent
  ],
  templateUrl: './end-round.component.html',
  styleUrl: './end-round.component.css'
})
export class EndRoundComponent implements OnInit {
  constructor(private tournamentService: TournamentService, private groupService: GroupService) { }

  loading: boolean = false;

  currentRound: string = '';

  totalRacesSubmitted: number = 0;
  totalRacesExpected: number = 0;
  totalRacesCompleted: number = 0;

  canEndRound: boolean = false;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.getTournamentInfo();
  }

  getTournamentInfo(): void {
    this.loading = true;
    this.tournamentService.getCurrentRound().subscribe({
      next: (data: { currentRound: string; totalRaces: number; completedRaces: number; canEndRound: boolean; }) => {
        this.currentRound = data.currentRound;
        this.totalRacesExpected = data.totalRaces;
        this.totalRacesCompleted = data.completedRaces;
        // this.canEndRound = data.canEndRound;

        this.groupService.getGroupCount().subscribe({
          next: (countData: { count: number }) => {
            this.totalRacesExpected = countData.count;
            this.loading = false;
            console.log('Total Races Expected:', this.totalRacesExpected);

            this.canEndRound = this.totalRacesCompleted >= this.totalRacesExpected;
          },
          error: (error: any) => {
            this.errorMessage = 'Error fetching total races expected';
            console.error(error);
            this.loading = false;
          }
        });
        
      },
      error: (error: any) => {
        this.errorMessage = 'Error fetching tournament info';
        console.error(error);
        this.loading = false;
      }
    });
  }

  endRound(): void {
    if (!this.canEndRound) {
      this.errorMessage = 'Cannot end round: not all races are completed.';
      return;
    }

    this.loading = true;
    this.tournamentService.endRound().subscribe({
      next: (data: { message: string; }) => {
        this.successMessage = data.message;
        this.errorMessage = '';
        this.loading = false;
        // Refresh the tournament info to reflect the new round
        this.getTournamentInfo();
      },
      error: (error: { error: { error: string; }; }) => {
        this.errorMessage = error.error?.error || 'Error ending round';
        console.error(error);
        this.loading = false;
      }
    });
  }

  clearAlert(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }
}