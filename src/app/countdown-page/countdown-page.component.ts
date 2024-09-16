import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { RunnersService } from '../services/runners.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-countdown-page',
  standalone: true,
  imports: [
    LoadingComponent
  ],
  templateUrl: './countdown-page.component.html',
  styleUrl: './countdown-page.component.css'
})
export class CountdownPageComponent implements OnInit {

  loading: boolean = true;
  targetTimestamp: number = 1726941600;

  timeRemaining: { days: number, hours: number, minutes: number, seconds: number } = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  
  private subscription!: Subscription;

  runners: any[] = [];

  constructor(private runnersService: RunnersService) { }

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe(() => {
      this.updateTimeRemaining();
    });

    this.getRunners();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getRunners(): void {
    this.runnersService.getRunners().subscribe(
      (data) => {
        this.runners = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching runners:', error);
      }
    );
  }

  updateTimeRemaining() {
    const currentTime = Math.floor(Date.now() / 1000);

    const timeDiff = this.targetTimestamp - currentTime;

    if (timeDiff <= 0) {
      this.timeRemaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return;
    }

    const days = Math.floor(timeDiff / (3600 * 24));
    const hours = Math.floor((timeDiff % (3600 * 24)) / 3600);
    const minutes = Math.floor((timeDiff % 3600) / 60);
    const seconds = Math.floor(timeDiff % 60);

    this.timeRemaining = { days, hours, minutes, seconds };
  }
}