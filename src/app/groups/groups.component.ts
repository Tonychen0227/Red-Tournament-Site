import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';


@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit {

  constructor(private groupService: GroupService) { }

  groups: any[] = [];
  errorMessage: string = '';

  ngOnInit(): void {
    this.fetchGroups();
  }

  fetchGroups(): void {
    this.groupService.getAllGroups().subscribe({
      next: (data) => {
        this.groups = data;
      },
      error: (error) => {
        console.error('Error fetching groups:', error);
        this.errorMessage = error.error || 'Failed to load groups.';
      }
    });
  }

}
