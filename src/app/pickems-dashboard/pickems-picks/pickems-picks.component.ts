import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { PickemsService } from '../../services/pickems.service';
import { LoadingComponent } from '../../loading/loading.component';
import { RaceService } from '../../services/race.service';

@Component({
  selector: 'app-pickems-picks',
  standalone: true,
  imports: [
    NgClass,
    LoadingComponent
  ],
  templateUrl: './pickems-picks.component.html',
  styleUrl: './pickems-picks.component.css'
})
export class PickemsPicksComponent implements OnInit {

  loading: boolean = true;

  pickems: any = null;
  completedRaces: any = null;
  round1Winners: string[] = [];
  round2Winners: string[] = [];
  round3Winners: string[] = [];

  constructor(private pickemsService: PickemsService, private raceService: RaceService) {}

  ngOnInit(): void {
    this.checkPickems();
  }

  checkPickems(): void {
    this.pickemsService.checkPickems().subscribe({
      next: (pickems) => {
        this.pickems = pickems;
        this.loadCompletedRaces();
      },
      error: (err) => {
        console.error('Error fetching Pickems:', err);
        this.loading = false;
      }
    });
  }

  loadCompletedRaces(): void {
    this.raceService.getCompletedRaces().subscribe({
      next: (completedRaces) => {
        this.completedRaces = completedRaces;

        // Clear previous winners
        this.round1Winners = [];
        this.round2Winners = [];
        this.round3Winners = [];

        // Organize winners by round
        for (let race of this.completedRaces) {
          const raceRound = race.round;

          if (raceRound === "Round 1") {
            this.round1Winners.push(race.winner);
          }

          if (raceRound === "Round 2") {
            this.round2Winners.push(race.winner);
          }

          if (raceRound === "Round 3") {
            this.round3Winners.push(race.winner);
          }
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching completed races:', err);
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

  isWinningPick(memberId: string, winners: string[]): boolean {
    return winners.some(winner => winner === memberId);
  }
}