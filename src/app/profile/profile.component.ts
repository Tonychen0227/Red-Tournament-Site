import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    DatePipe,
    TitleCasePipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user: any = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.checkAuthStatus().subscribe(user => {
      this.user = user;
    });
  }
}