import { Component } from '@angular/core';
import { RaceService } from '../../services/race.service';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { Globals } from '../../services/globals';

@Component({
  selector: 'app-submit-race',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './submit-race.component.html',
  styleUrl: './submit-race.component.css'
})
export class SubmitRaceComponent {
  successMessage: string = '';
  errorMessage: string = ''

  userTimezoneLabel: string = '';

  runners: any[] = [];

  date: string = '';
  time: string = '';

  raceData: any = {
    racer1: null,
    racer2: null,
    racer3: null,
    raceDateTime: null
  };

  raceAlreadySubmitted: boolean = false;

  userTimezone: string = 'UTC';

  constructor(
    public globals: Globals,
    private raceService: RaceService, 
    private groupService: GroupService,
    private router: Router
  ) { }

  ngOnInit(): void {    
    this.setUserTimezoneLabel();

    if (this.globals.userId) {
      this.raceData.racer1 = this.globals.userId;

      this.groupService.getCurrentUserGroup().subscribe(group => {
        this.populateRacers(group.members, this.globals.userId!);       
  
        if (group.raceStartTime) {
          this.successMessage = 'A race has already been scheduled for this group. Contact @organizers if you have an issue.';
          this.raceAlreadySubmitted = true;
        }
      });
    }
  }

  setUserTimezoneLabel() {
    const offsetMinutes = new Date().getTimezoneOffset();
    const hours = Math.abs(offsetMinutes / 60);
    const minutes = Math.abs(offsetMinutes % 60);
    const sign = offsetMinutes > 0 ? '-' : '+';
  
    this.userTimezoneLabel = `UTC${sign}${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }

  submitRace() {
    this.successMessage = '';
    this.errorMessage = '';
  
    if (!this.date || !this.time || !this.raceData.racer2) {
      this.errorMessage = 'All fields are required. Please fill them out and try again.';
      return;
    }
  
    const combinedDateTime = `${this.date}T${this.time}`;
    const localDate = new Date(combinedDateTime);
    const unixTimestamp = Math.floor(localDate.getTime() / 1000);
  
    this.raceData.raceDateTime = unixTimestamp;
  
    this.raceService.submitRace(this.raceData).subscribe(response => {
      this.successMessage = response.message;
      this.errorMessage = '';
  
      setTimeout(() => {
        this.router.navigate(['/races/upcoming']);
      }, 2000);
    }, error => {
      this.errorMessage = 'Something went wrong. Please refresh the page and try again.';
      this.successMessage = '';
    });
  }

  populateRacers(members: any[], userId: string) {
    // Filter out the current user and assign the remaining members
    const otherMembers = members.filter(member => member._id !== userId);

    this.raceData.racer2 = otherMembers[0]?._id || null; // Assign racer2
    this.raceData.racer3 = otherMembers[1]?._id || null; // Assign racer3 if applicable
    
    this.runners = otherMembers;    
  }

  clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }
}