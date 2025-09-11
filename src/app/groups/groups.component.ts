import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { LoadingComponent } from '../loading/loading.component';
import { TournamentService } from '../services/tournament.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PickemsService } from '../services/pickems.service';
import { Group } from '../interfaces/group';

// Extended interface for frontend display with favorites
interface GroupWithFavorites extends Group {
  favorite?: any[];
}

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

  groups: GroupWithFavorites[] = [];
  filteredGroups: GroupWithFavorites[] = [];

  favourites: any[] = [];

  private groupsLoaded: boolean = false;
  private favouritesLoaded: boolean = false;

  rounds: string[] = ['Round 1', 'Round 2', 'Round 3', 'Quarterfinals', 'Semifinals', 'Final'];
  currentRound: string = 'Round 1'; 

  ngOnInit(): void {
    this.tournamentService.getCurrentRound().subscribe((data: any) => {
      this.currentRound = data.currentRound;
      this.fetchGroups();
      this.fetchFavourites();
    }, error => {
      console.error('Error fetching current round:', error);
      this.errorMessage = error.error || 'Failed to load current round.';
      this.loading = false;
    });
  }

  fetchGroups(): void {
    this.groupService.getAllGroups().subscribe({
      next: (data) => {
        this.groups = data.groups;
        this.groupsLoaded = true;
        this.mergeData();
      },
      error: (error) => {
        console.error('Error fetching groups:', error);
        this.errorMessage = error.error || 'Failed to load groups.';
        this.loading = false;
      }
    });
  }

  fetchFavourites(): void {
    this.pickemsService.getFavorites().subscribe({
      next: (favourites) => {
        this.favourites = favourites;
        this.favouritesLoaded = true;
        this.mergeData();
      },
      error: (err) => {
        console.error('Error fetching favorites:', err);
        this.errorMessage = err.error || 'Failed to load favorites.';
        this.loading = false;
      },
    })
  }

  mergeData(): void {
    if (this.groupsLoaded && this.favouritesLoaded) {
      const favouritesMap: { [round: string]: { [groupNumber: number]: any } } = {};

      this.favourites.forEach((favRound: any) => {
        favouritesMap[favRound.round] = {};
        favRound.groups.forEach((favGroup: any) => {
          favouritesMap[favRound.round][favGroup.groupNumber] = favGroup.favorite;
        });
      });

      this.groups.forEach(group => {
        const roundFavourites = favouritesMap[group.round];
        if (roundFavourites && roundFavourites[group.groupNumber]) {
          group.favorite = roundFavourites[group.groupNumber];
        } else {
          group.favorite = [];
        }
      });

      this.filterGroupsByRound(this.currentRound);

      this.loading = false;
    }
  }

  filterGroupsByRound(round: string): void {
    this.filteredGroups = this.groups.filter(group => group.round === round);
  }

  onRoundSelected(round: string): void {
    this.currentRound = round;
    this.filterGroupsByRound(round);
  }

  isFavorite(memberId: string, favorites: any[]): boolean {
    return favorites.some(fav => fav.userId === memberId);
  }
}