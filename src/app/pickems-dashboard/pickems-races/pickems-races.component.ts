import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { TournamentService } from '../../services/tournament.service';
import { PickemsService } from '../../services/pickems.service';
import { LoadingComponent } from '../../loading/loading.component';
import { Router } from '@angular/router';

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
    private groupService: GroupService, 
    private tournamentService: TournamentService,
    private router: Router
  ) { }

  loading: boolean = true;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  groups: any[] = [];
  filteredGroups: any[] = [];

  selectedWinners: any[] = [];
  
  rounds: string[] = ['Seeding', 'Round 1', 'Round 2', 'Round 3', 'Semifinals'];
  currentRound: string = 'Round 1';
  
  hasSubmitted: boolean = false;

  ngOnInit(): void {    
    this.tournamentService.getCurrentRound().subscribe((data: any) => {
      // this.currentRound = data.currentRound;
      this.fetchPickemsAndGroups();
    });
  }

  fetchPickemsAndGroups(): void {
    this.pickemsService.checkPickems().subscribe({
      next: (pickems: any) => {
        // Determine if the user has already submitted picks for the current round
        if (pickems && this.isRoundSubmitted(pickems, this.currentRound)) {
          this.hasSubmitted = true;
        } else {
          this.hasSubmitted = false;
          this.fetchGroups();
        }
        this.loading = false;
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
      'Semifinals': 'semiFinalsPicks',
    };

    const roundField = roundFieldMap[round];
    if (!roundField) {
      console.warn(`Round "${round}" is not recognized.`);
      return false;
    }

    return pickems[roundField] && pickems[roundField].length > 0;
  }

  fetchGroups(): void {
    this.groupService.getAllGroups().subscribe({
      next: (data) => {
        this.groups = data;
        this.filterGroupsByRound(this.currentRound);
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
    this.filteredGroups = this.groups.filter(group => group.round === round && group.raceStarted != "false");

    console.log(this.groups);
    
  }

  // onWinnerChange(groupId: string, runnerId: string): void {
  //   // Ensure that the selected winner is properly set for the group
  //   this.selectedWinners = this.selectedWinners.filter(id => id !== runnerId); // Clear previous selection for the group
  //   this.selectedWinners.push(runnerId); // Add the new selection

  //   console.log(this.selectedWinners);
    
  // }
  
  onWinnerChange(groupId: string, runnerId: string): void {
    // Find the group to which this runner belongs
    const group = this.filteredGroups.find(g => g._id === groupId);
    if (!group) {
      console.warn(`Group with ID ${groupId} not found.`);
      return;
    }

    // Check if any runner from this group is already in selectedWinners
    const existingRunnerId = group.members.find((runner: { _id: any; }) => this.selectedWinners.includes(runner._id))?._id;

    if (existingRunnerId) {
      // Remove the existing runner from selectedWinners
      this.selectedWinners = this.selectedWinners.filter(id => id !== existingRunnerId);
    }

    // Add the new runner ID
    this.selectedWinners.push(runnerId);

    console.log(this.selectedWinners);

  }


  canSubmitWinners(): boolean {
    // Ensure we have the same number of selected winners as there are groups
    return this.selectedWinners.length === this.filteredGroups.length;
  }

  saveWinners(): void {
    // Submit the selected winners (array of runner IDs)
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