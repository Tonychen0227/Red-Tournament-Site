import { Component, OnInit } from '@angular/core';
import { Stats } from '../../interfaces/stats';
import { StatsService } from '../services/stats.service';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit {
  
  loading: boolean = true;
  error: string | null = null;
  
  stats: Stats | null = null;

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.statsService.fetchStats().subscribe({
      next: (data: Stats) => {
        this.stats = data;
        this.loading = false;        
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load statistics.';
        this.loading = false;
      }
    });
  }

  formatTime(ms: number): string {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}