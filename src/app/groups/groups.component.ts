import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { LoadingComponent } from '../loading/loading.component';
import { TournamentService } from '../services/tournament.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PickemsService } from '../services/pickems.service';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit {

  constructor(
    private groupService: GroupService,
    private tournamentService: TournamentService,
    private pickemsService: PickemsService
  ) { }

  loading: boolean = true;
  errorMessage: string = '';

  groups: any[] = [];
  filteredGroups: any[] = [];

  favourites: any[] = [];

  rounds: string[] = ['Seeding', 'Round 1', 'Round 2', 'Round 3', 'Semifinals'];
  currentRound: string = 'Seeding'; 

  ngOnInit(): void {
    this.tournamentService.getCurrentRound().subscribe((data: any) => {
      this.currentRound = data.currentRound;
      this.fetchGroups();
      this.fetchFavourites();
      this.loading = false;
    });
  }

  fetchGroups(): void {
    this.groupService.getAllGroups().subscribe({
      next: (data) => {
        this.groups = data.groups;
        this.filterGroupsByRound(this.currentRound);     

        console.log(data);
        
      },
      error: (error) => {
        console.error('Error fetching groups:', error);
        this.errorMessage = error.error || 'Failed to load groups.';
      }
    });
  }

  fetchFavourites(): void {
    this.pickemsService.getFavorites().subscribe({
      next: (favourites) => {
        this.favourites = favourites;
        console.log(favourites);
      },
      error: (err) => {
        console.error('Error fetching groups:', err);
        this.errorMessage = err.error || 'Failed to load groups.';
      },
    })
  }

  filterGroupsByRound(round: string): void {
    this.filteredGroups = this.groups.filter(group => group.round === round);
  }

  onRoundSelected(round: string): void {
    this.currentRound = round;
    this.filterGroupsByRound(round);
  }
  
}