import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CountdownPageComponent } from "./countdown-page/countdown-page.component";
import { AuthService } from './services/auth.service';
import { Globals } from './services/globals';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    CountdownPageComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Pokemon Red Tournament';
  
  isAdmin: boolean = false;

  constructor(private authService: AuthService, public globals: Globals) {}

  ngOnInit(): void {
    this.authService.checkAuthStatus();    
  }
}