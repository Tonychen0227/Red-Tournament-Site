import { Component } from '@angular/core';
import { RaceService } from '../../services/race.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-race-detail',
  standalone: true,
  imports: [],
  templateUrl: './race-detail.component.html',
  styleUrl: './race-detail.component.css'
})
export class RaceDetailComponent {
  
  race: any;

  constructor(private route: ActivatedRoute, private raceService: RaceService) { }

  ngOnInit(): void {
    const raceId = this.route.snapshot.paramMap.get('id');

    if (raceId) {
      this.fetchRaceDetails(raceId);
    }
  }

  fetchRaceDetails(id: string): void {
    this.raceService.getRaceById(id).subscribe({
      next: (data) => {
        this.race = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching race details:', error);
      },
      complete: () => {
        console.log('Race details fetched successfully');
      }
    });
  }
  

  getFormattedDatetime(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleString();
  }
}
