import { Component } from '@angular/core';
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

  formatTime(milliseconds: number): string {
    const ms = milliseconds % 1000;
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    return `${hours}h ${minutes}m ${seconds}s ${ms}ms`;
  } 
}