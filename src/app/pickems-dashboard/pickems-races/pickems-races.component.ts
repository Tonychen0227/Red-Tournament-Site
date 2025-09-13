import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { PickemsService } from '../../services/pickems.service';
import { LoadingComponent } from '../../loading/loading.component';
import { Router } from '@angular/router';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-pickems-races',
  standalone: true,
  imports: [
    LoadingComponent
  ],
  templateUrl: './pickems-races.component.html',
  styleUrl: './pickems-races.component.css'
})
export class PickemsRacesComponent implements OnInit {

  constructor(
    private pickemsService: PickemsService,
    private tournamentService: TournamentService,
    private groupService: GroupService, 
    private router: Router
  ) { }

  loading: boolean = true;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  groups: any[] = [];
  filteredGroups: any[] = [];

  selectedWinners: any[] = [];
  
  rounds: string[] = ['Round 1', 'Round 2', 'Round 3', 'Quarterfinals', 'Semifinals', 'Final'];
  currentRound: string = 'Round 1';
  
  hasSubmitted: boolean = false;

  ngOnInit(): void {    
    this.tournamentService.getCurrentRound().subscribe({
      next: (result) => {
        this.currentRound = result.currentRound;
        
        this.fetchPickemsAndGroups();
      },
      error: (err) => {
        console.error('Error fetching current round:', err);
      }
    })
  }

  fetchPickemsAndGroups(): void {
    this.pickemsService.checkPickems().subscribe({
      next: (pickems: any) => {
        // Determine if the user has already submitted picks for the current round
        if (pickems && this.isRoundSubmitted(pickems, this.currentRound)) {
          this.hasSubmitted = true;
          this.loading = false;
        } else {
          this.hasSubmitted = false;
          this.fetchGroups();
        }
      },
      error: (error) => {
        this.errorMessage = 'Error fetching your Pickems data.';
        this.loading = false;
        console.error(error);
      }
    });
  }

  isRoundSubmitted(pickems: any, round: string): boolean {
    const roundFieldMap: { [key: string]: string } = {
      'Round 1': 'round1Picks',
      'Round 2': 'round2Picks',
      'Round 3': 'round3Picks',
      'Quarterfinals': 'quarterFinalsPicks',
      'Semifinals': 'semiFinalsPicks',
      'Final': 'finalPick'
    };
  
    const roundField = roundFieldMap[round];
    if (!roundField) {
      console.warn(`Round "${round}" is not recognized.`);
      return false;
    }
  
    const singlePickRounds = ['Final'];
  
    if (singlePickRounds.includes(round)) {
      // For single-pick rounds, check if the field is not null or undefined
      return !!pickems[roundField];
    } else {
      // For multi-pick rounds, check if the array has elements
      return Array.isArray(pickems[roundField]) && pickems[roundField].length > 0;
    }
  }
  
  fetchGroups(): void {
    this.groupService.getAllGroups().subscribe({
      next: (data) => {        
        this.groups = data.groups;
        this.filterGroupsByRound(this.currentRound);
        this.filterGroupsByTime(this.currentRound); 
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching groups:', error);
        this.errorMessage = error.error || 'Failed to load groups.';
        this.loading = false;
      }
    });
  }

  filterGroupsByRound(round: string): void {
    this.filteredGroups = this.groups.filter(group => group.round === round);
  }  

  filterGroupsByTime(round: string): void {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    // Filter groups where race hasn't started
    this.filteredGroups = this.filteredGroups.filter(group => {
      if (!group.raceStartTime) return true;
      return group.raceStartTime >= currentTime;
    });
  }
  
  onWinnerChange(groupId: string, runnerId: string): void {
    const group = this.filteredGroups.find(g => g._id === groupId);
    
    if (!group) {
      console.warn(`Group with ID ${groupId} not found.`);
      return;
    }

    // Check if any runner from this group is already in selectedWinners
    const existingRunnerId = group.members.find((runner: { _id: any; }) => this.selectedWinners.includes(runner._id))?._id;

    if (existingRunnerId) {
      this.selectedWinners = this.selectedWinners.filter(id => id !== existingRunnerId);
    }

    this.selectedWinners.push(runnerId);
  }


  canSubmitWinners(): boolean {
    return this.selectedWinners.length === this.filteredGroups.length;
  }

  saveWinners(): void {
    this.pickemsService.submitRoundWinners(this.selectedWinners).subscribe({
      next: () => {
        this.successMessage = 'Picks submitted successfully!';
        this.router.navigate(['/pickems/picks']);
      },
      error: (error: any) => {
        console.error('Error submitting picks:', error);
        this.successMessage = null;
        this.errorMessage = 'Failed to submit picks. Please try again.';
      }
    });
  }

  clearAlert(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }
}