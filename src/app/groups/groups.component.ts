import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { LoadingComponent } from '../loading/loading.component';
import { TournamentService } from '../services/tournament.service';


@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [
    LoadingComponent
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit {

  constructor(private groupService: GroupService, private tournamentService: TournamentService) { }

  loading: boolean = true;
  errorMessage: string = '';

  groups: any[] = [];
  filteredGroups: any[] = [];

  rounds: string[] = ['Seeding', 'Round 1', 'Round 2', 'Round 3', 'Semifinals'];
  currentRound: string = 'Seeding'; 

  ngOnInit(): void {
    // Fetch the current round from the tournament service
    this.tournamentService.getCurrentRound().subscribe((data: any) => {
      this.currentRound = data.currentRound;
      this.fetchGroups();
    });
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
    this.filteredGroups = this.groups.filter(group => group.round === round);
  }

  onRoundSelected(round: string): void {
    this.currentRound = round;
    this.filterGroupsByRound(round);
  }
  
}
