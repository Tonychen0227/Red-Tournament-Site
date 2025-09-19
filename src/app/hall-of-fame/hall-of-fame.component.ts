import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PastResults } from '../interfaces/past-results';
import { PastResultsService } from '../services/past-results.service';
import { LoadingComponent } from '../loading/loading.component';
import { CountryFlagComponent } from '../country-flag/country-flag.component';

@Component({
  selector: 'app-hall-of-fame',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    CountryFlagComponent
  ],
  templateUrl: './hall-of-fame.component.html',
  styleUrl: './hall-of-fame.component.css'
})
export class HallOfFameComponent implements OnInit {

  loading = true;
  errorMessage: string | null = null;
  pastResults: PastResults[] = [];

  constructor(
    private pastResultsService: PastResultsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.fetchPastResults();
  }

  fetchPastResults(): void {
    this.pastResultsService.getAllPastResults().subscribe({
      next: (data) => {
        this.pastResults = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching past results';
        this.loading = false;
        console.error('Error:', err);
      },
    });
  }

  clearAlert(): void {
    this.errorMessage = null;
  }

  getYouTubeEmbedUrl(url: string): SafeResourceUrl {
    // Convert YouTube watch URLs to embed URLs
    let embedUrl: string;
    
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else {
      // Return original URL if it's already an embed URL or different format
      embedUrl = url;
    }
    
    // Mark the URL as safe for Angular's sanitizer
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}