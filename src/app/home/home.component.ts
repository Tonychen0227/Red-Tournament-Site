import { Component } from '@angular/core';
import { RunnersService } from '../services/runners.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { forkJoin } from 'rxjs';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    LoadingComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  loading: boolean = true;

  user: any = null;
  runners: any[] = [];

  constructor(private authService: AuthService, private runnersService: RunnersService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      user: this.authService.checkAuthStatus(),
      runners: this.runnersService.getRunners()
    }).subscribe({
      next: ({ user, runners }) => {
        this.user = user;
        this.runners = runners;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.loading = false;
      }
    });
  }
}