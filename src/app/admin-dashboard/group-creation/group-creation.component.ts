import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { User } from '../../interfaces/user';

import { RunnersService } from '../../services/runners.service';
import { GroupService } from '../../services/group.service';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-group-creation',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './group-creation.component.html',
  styleUrl: './group-creation.component.css'
})
export class GroupCreationComponent implements OnInit {

  constructor(private runnersService: RunnersService, private groupService: GroupService) { }

  successMessage: string | null = null;
  errorMessage: string | null = null;

  runners: User[] = [];

  groupData = {
    racer1: '',
    racer2: '',
    racer3: ''
  };


  ngOnInit(): void {
    this.fetchRunners();
  }

  fetchRunners(): void {
    this.runnersService.getRunners().subscribe((data: User[]) => {
        this.runners = data;      
      });
  }
  
  createGroup(): void {
    this.clearMessages();

    const { racer1, racer2, racer3 } = this.groupData;

    if (!racer1 || !racer2) {
      this.errorMessage = 'Racer 1 and Racer 2 are required.';
      return;
    }

    this.groupService.createGroup(racer1, racer2, racer3)
      .pipe(
        tap(response => {
          this.successMessage = "Group successfully created"
          this.groupData = { racer1: '', racer2: '', racer3: '' };

        }),
        catchError(error => {
          this.errorMessage = `Failed to create group: ${error.message}`;
          console.error('Create group failed:', error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  clearMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }
}
