import { Component, OnInit } from '@angular/core';
import { PickemsService } from '../../services/pickems.service';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-pickems-leaderboard',
  standalone: true,
  imports: [
    LoadingComponent
  ],
  templateUrl: './pickems-leaderboard.component.html',
  styleUrl: './pickems-leaderboard.component.css'
})
export class PickemsLeaderboardComponent implements OnInit {

  loading: boolean = true;
  errorMessage: string | null = null;

  leaderboard: any[] = [];

  constructor(private pickemsService: PickemsService) {}

  ngOnInit(): void {
    this.loadLeaderboard();
  }

  loadLeaderboard() {
    this.pickemsService.getLeaderboard().subscribe(
      (data) => {
        this.leaderboard = data;
        this.loading = false;        
      },
      (error) => {
        this.errorMessage = 'Error fetching leaderboard';
        this.loading = false;
      }
    );
  }

  clearAlert() {
    this.errorMessage = null;
  }
}
