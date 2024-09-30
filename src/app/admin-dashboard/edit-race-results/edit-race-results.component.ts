// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { RaceService } from '../../services/race.service';
// import { Race, RaceResult } from '../../../interfaces/race';
// import { LoadingComponent } from '../../loading/loading.component';
// import { DatePipe } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-edit-race-results',
//   standalone: true,
//   imports: [
//     FormsModule,
//     LoadingComponent,
//     DatePipe
//   ],
//   templateUrl: './edit-race-results.component.html',
//   styleUrl: './edit-race-results.component.css'
// })
// export class EditRaceResultsComponent implements OnInit {

//   constructor(
//     private raceService: RaceService,
//     private cdr: ChangeDetectorRef
//   ) {}

//   loading: boolean = true;

//   successMessage: string | null = null;
//   errorMessage: string | null = null;

//   pastRaces: Race[] = [];
//   editableRaceResults: { [key: string]: RaceResult[] } = {};

//   ngOnInit(): void {
//     this.fetchPastRaces();
//   }

//   fetchPastRaces(): void {
//     this.raceService.getCompletedRaces().subscribe(
//       (races: Race[]) => {
//         this.pastRaces = races;
//         this.initializeEditableResults();
//         this.loading = false;

//         console.log(races);
        
//       },
//       (error) => {
//         console.error('Error fetching past races:', error);
//         this.errorMessage = 'Failed to load past races.';
//         this.loading = false;
//       }
//     );
//   }

//   initializeEditableResults(): void {
//     this.pastRaces.forEach((race) => {
//       if (race.results) {
//         this.editableRaceResults[race._id] = race.results.map(result => ({
//           ...result,
//           // Clone the finishTime to prevent direct mutations
//           finishTime: { ...result.finishTime }
//         }));
//       }
//     });
//   }

//   clearMessages() {
//     this.successMessage = '';
//     this.errorMessage = '';
//   }

//   validateHours(value: number, raceId: string, racerIndex: number): void {
//     if (value < 0) {
//       this.editableRaceResults[raceId][racerIndex].finishTime.hours = 2;
//     } else if (value > 2) {
//       this.editableRaceResults[raceId][racerIndex].finishTime.hours = 0;
//     } else {
//       this.editableRaceResults[raceId][racerIndex].finishTime.hours = value;
//     }

//     this.cdr.detectChanges();
//   }

//   validateMinutes(value: number, raceId: string, racerIndex: number): void {
//     if (value < 0) {
//       this.editableRaceResults[raceId][racerIndex].finishTime.minutes = 59;
//     } else if (value > 59) {
//       this.editableRaceResults[raceId][racerIndex].finishTime.minutes = 0;
//     } else {
//       this.editableRaceResults[raceId][racerIndex].finishTime.minutes = value;
//     }
  
//     this.cdr.detectChanges();
//   }
  
//   validateSeconds(value: number, raceId: string, racerIndex: number): void {
//     if (value < 0) {
//       this.editableRaceResults[raceId][racerIndex].finishTime.seconds = 59;
//     } else if (value > 59) {
//       this.editableRaceResults[raceId][racerIndex].finishTime.seconds = 0;
//     } else {
//       this.editableRaceResults[raceId][racerIndex].finishTime.seconds = value;
//     }
  
//     this.cdr.detectChanges();
//   }

//   validateMilliseconds(value: number, raceId: string, racerIndex: number): void {
//     if (value < 0) {
//       this.editableRaceResults[raceId][racerIndex].finishTime.milliseconds = 999;
//     } else if (value > 999) {
//       this.editableRaceResults[raceId][racerIndex].finishTime.milliseconds = 0;
//     } else {
//       this.editableRaceResults[raceId][racerIndex].finishTime.milliseconds = value;
//     }
  
//     this.cdr.detectChanges();
//   }

//   saveRaceResults(race: Race): void {
//     this.clearMessages();

//     // Prepare the updated results
//     const updatedResults: RaceResult[] = this.editableRaceResults[race._id].map((result, index) => {
//       // Ensure that if the status is not 'Finished', finishTime is reset
//       if (result.status !== 'Finished') {
//         return {
//           ...result,
//           finishTime: { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }
//         };
//       }
//       return result;
//     });

//     // Optionally, you might want to include raceTimeId if it's part of the payload
//     const raceTimeId = race.raceTimeId;

//     // Call the service to update the race
//     this.raceService.updateRace(race._id, updatedResults, raceTimeId).subscribe(
//       (response) => {
//         this.successMessage = `Race ${race._id} results recorded successfully!`;
//         this.loading = false;
//         this.fetchPastRaces(); // Refresh the data to reflect changes
//       },
//       (error) => {
//         console.error('Error saving race results:', error);
//         this.errorMessage = `Failed to record results for race ${race._id}.`;
//         this.loading = false;
//       }
//     );
//   }

//   clearRaceResults(raceId: string): void {
//     const race = this.pastRaces.find(r => r._id === raceId);
//     if (race && race.results) {
//       this.editableRaceResults[raceId] = race.results.map(result => ({
//         ...result,
//         finishTime: { ...result.finishTime }
//       }));
//       this.clearMessages();
//       this.cdr.detectChanges();
//     }
//   }
// }