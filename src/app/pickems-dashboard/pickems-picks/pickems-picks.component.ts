import { Component, Input } from '@angular/core';
import { PickemsService } from '../../services/pickems.service';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-pickems-picks',
  standalone: true,
  imports: [
    LoadingComponent
  ],
  templateUrl: './pickems-picks.component.html',
  styleUrl: './pickems-picks.component.css'
})
export class PickemsPicksComponent {

  loading: boolean = true;

  pickems: any = null;

  constructor(private pickemsService: PickemsService) {}

  ngOnInit() {
    this.checkPickems();
  }

  checkPickems() {
    this.pickemsService.checkPickems().subscribe({
      next: (pickems) => {
        this.pickems = pickems;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching Pickems:', err);
        this.loading = false;
      }
    });
  }

  formatTime(ms: number): string {
    const hours = Math.floor(ms / 3600000); // 1 hour = 3600000 milliseconds
    const minutes = Math.floor((ms % 3600000) / 60000); // 1 minute = 60000 milliseconds
    const seconds = Math.floor((ms % 60000) / 1000); // 1 second = 1000 milliseconds
    const milliseconds = ms % 1000; // Remaining milliseconds

    // Pad hours, minutes, and seconds to always display 2 digits
    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');
    const millisecondsStr = milliseconds.toString().padStart(3, '0');

    return `${hoursStr}:${minutesStr}:${secondsStr}:${millisecondsStr}`;
  }
}
