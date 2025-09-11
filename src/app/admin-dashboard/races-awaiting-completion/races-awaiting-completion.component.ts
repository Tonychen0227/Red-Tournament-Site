import { ChangeDetectorRef, Component } from '@angular/core';
import { RaceService } from '../../services/race.service';
import { Race, RaceResult } from '../../interfaces/race';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from "../../loading/loading.component";

@Component({
  selector: 'app-races-awaiting-completion',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    RouterLink,
    LoadingComponent
],
  templateUrl: './races-awaiting-completion.component.html',
  styleUrl: './races-awaiting-completion.component.css'
})
export class RacesAwaitingCompletionComponent {

  constructor(private raceService: RaceService,
    private cdr: ChangeDetectorRef) {}

  loading: boolean = true;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  races: Race[] = [];
  raceResults: { [key: string]: RaceResult[] } = {};

  ngOnInit(): void {
    this.getRaces();
  }

  getRaces(): void {
    this.raceService.getRacesReadyForCompletion().subscribe(
      (races: Race[]) => {
        this.races = races;
        this.initialiseResults();
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching races:', error);
      }
    );
  }

  initialiseResults(): void {
    this.races.forEach((race) => {
      this.raceResults[race._id] = [
        { racer: race.racer1, 
          status: 'Finished', 
          finishTime: { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }, 
          dnfOrder: null 
        },
        { racer: race.racer2, 
          status: 'Finished', 
          finishTime: { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
          dnfOrder: null 
        },
      ];

      if (race.racer3) {
        this.raceResults[race._id].push({
          racer: race.racer3,
          status: 'Finished',
          finishTime: { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
          dnfOrder: null 
        });
      }
    });
  }

  clearRaceResults(raceId: string): void {
    const race = this.races.find(r => r._id === raceId);
  
    if (race) {
      this.raceResults[raceId] = [
        {
          racer: race.racer1,
          status: 'Finished',
          finishTime: { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
          dnfOrder: null 
        },
        {
          racer: race.racer2,
          status: 'Finished',
          finishTime: { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
          dnfOrder: null 
        },
      ];
  
      if (race.racer3) {
        this.raceResults[raceId].push({
          racer: race.racer3,
          status: 'Finished',
          finishTime: { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
          dnfOrder: null 
        });
      }
  
      this.cdr.detectChanges();
    }
  }

  canSubmitRaceResults(race: Race): boolean {
    const raceResults = this.raceResults[race._id];

    const raceTimeIdEntered: boolean = race.raceTimeId != null && race.raceTimeId.trim() !== '';

    const allResultsValid = raceResults.every(result => {
      if (result.status === 'Finished') {
        const { hours, minutes, seconds, milliseconds } = result.finishTime;
        return !(hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 0);
      }

      return true; // For statuses other than 'Finished', no need to check time
    });

    const dnfResults = raceResults.filter(result => result.status === 'DNF');
    const dnfOrders = dnfResults.map(result => result.dnfOrder);
    const uniqueDnfOrders = new Set(dnfOrders);

    const dnfOrdersValid = dnfOrders.length === uniqueDnfOrders.size;

    const allDnfOrdersAssigned = dnfResults.every(result => result.dnfOrder !== null && result.dnfOrder !== undefined && result.dnfOrder > 0);

    return raceTimeIdEntered && allResultsValid && dnfOrdersValid && allDnfOrdersAssigned;
  }

  completeRace(race: Race): void {
    this.clearAlert();

    const raceResults = this.raceResults[race._id].map(result => {
      if (result.status !== 'Finished') {
        return {
          ...result,
          finishTime: { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }
        };
      }

      return result;
    });

    this.loading = true;

    if (!race.raceTimeId) return;
  
    this.raceService.completeRace(race._id, race.raceTimeId, raceResults).subscribe(
      (response) => {
        if (race.racer3) {
          this.successMessage = `Race between ${race.racer1.displayName}, ${race.racer2.displayName}, and ${race.racer3.displayName} recorded successfully!`;
        } else {
          this.successMessage = `Race between ${race.racer1.displayName} and ${race.racer2.displayName} recorded successfully!`;
        }
  
        this.loading = false;
        this.getRaces();
      },
      (error) => {
        this.errorMessage = `Error completing race ${race._id}: ${error.message}`;
        this.loading = false;
        this.getRaces();
        console.error('Error completing race:', error);
      }
    );
  }
  
  validateHours(value: number, raceId: string, racerIndex: number): void {
    if (value < 0) {
      this.raceResults[raceId][racerIndex].finishTime.hours = 4;
    } else if (value > 4) {
      this.raceResults[raceId][racerIndex].finishTime.hours = 0;
    } else {
      this.raceResults[raceId][racerIndex].finishTime.hours = value;
    }

    this.cdr.detectChanges();
  }

  validateMinutes(value: number, raceId: string, racerIndex: number): void {
    if (value < 0) {
      this.raceResults[raceId][racerIndex].finishTime.minutes = 59;
    } else if (value > 59) {
      this.raceResults[raceId][racerIndex].finishTime.minutes = 0;
    } else {
      this.raceResults[raceId][racerIndex].finishTime.minutes = value;
    }
  
    this.cdr.detectChanges();
  }
  
  validateSeconds(value: number, raceId: string, racerIndex: number): void {
    if (value < 0) {
      this.raceResults[raceId][racerIndex].finishTime.seconds = 59;
    } else if (value > 59) {
      this.raceResults[raceId][racerIndex].finishTime.seconds = 0;
    } else {
      this.raceResults[raceId][racerIndex].finishTime.seconds = value;
    }
  
    this.cdr.detectChanges();
  }

  validateMilliseconds(value: number, raceId: string, racerIndex: number): void {
    if (value < 0) {
      this.raceResults[raceId][racerIndex].finishTime.milliseconds = 999;
    } else if (value > 999) {
      this.raceResults[raceId][racerIndex].finishTime.milliseconds = 0;
    } else {
      this.raceResults[raceId][racerIndex].finishTime.milliseconds = value;
    }
  
    this.cdr.detectChanges();
  }

  clearAlert(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }

  onStatusChange(raceId: string, racerIndex: number): void {
    const selectedStatus = this.raceResults[raceId][racerIndex].status;

    if (selectedStatus !== 'DNF') {
      // If the status is not DNF, reset the dnfOrder
      this.raceResults[raceId][racerIndex].dnfOrder = null;
    } else {
      // If DNF is selected, assign a default dnfOrder if not already set
      if (this.raceResults[raceId][racerIndex].dnfOrder === null) {
        // Find the next available dnfOrder
        const existingOrders = this.raceResults[raceId]
          .filter(result => result.status === 'DNF' && result.dnfOrder !== null)
          .map(result => result.dnfOrder!);
        
        const nextOrder = existingOrders.length > 0 ? Math.max(...existingOrders) + 1 : 1;
        this.raceResults[raceId][racerIndex].dnfOrder = nextOrder;
      }
    }

    this.cdr.detectChanges();
  }

}