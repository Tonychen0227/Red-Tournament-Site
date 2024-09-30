import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../../interfaces/user';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PickemsTournamentComponent } from './pickems-tournament/pickems-tournament.component';
import { PickemsService } from '../services/pickems.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-pickems-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    PickemsTournamentComponent,
    LoadingComponent
  ],
  templateUrl: './pickems-dashboard.component.html',
  styleUrl: './pickems-dashboard.component.css'
})
export class PickemsDashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private pickemsService: PickemsService,
    private router: Router
  ) {}

  loading: boolean = true;

  user: User | null = null; 
  pickems: any = null;

  ngOnInit(): void {
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


}
