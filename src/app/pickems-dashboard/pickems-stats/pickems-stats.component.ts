import { Component, OnInit } from '@angular/core';
import { PickemsService } from '../../services/pickems.service';
import { LoadingComponent } from '../../loading/loading.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pickems-stats',
  standalone: true,
  imports: [
    LoadingComponent,
    RouterLink,
    CommonModule
  ],
  templateUrl: './pickems-stats.component.html',
  styleUrl: './pickems-stats.component.css'
})
export class PickemsStatsComponent implements OnInit {

  constructor(private pickemsService: PickemsService) { }

  topOverallWinners: any[] = [];
  topBestTimePicks: any[] = [];
  top9Picks: any[] = [];

  topPicksByRound: any = {};

  favorites: any[] = [];

  loading: boolean = true;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.fetchAllStats();  
  }

  fetchAllStats(): void {
    this.pickemsService.getAllStats().subscribe({
      next: (data) => {
        this.topOverallWinners = data.topOverallWinners;
        this.topBestTimePicks = data.topBestTimePicks;
        this.top9Picks = data.top9Picks;
        this.topPicksByRound = data.topPicksByRound;

        this.loading = false;        
      },
      error: (err) => {
        console.error('Error fetching all stats:', err);
        this.errorMessage = 'Unable to load stats.';
        this.loading = false;
      }
    });
  }
}