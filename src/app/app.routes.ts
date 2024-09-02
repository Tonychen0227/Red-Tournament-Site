import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StandingsComponent } from './standings/standings.component';
import { UpcomingRacesComponent } from './races/upcoming-races/upcoming-races.component';
import { PastRacesComponent } from './races/past-races/past-races.component';
import { SubmitRaceComponent } from './races/submit-race/submit-race.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'standings', component: StandingsComponent },
    {
        path: 'races',
        children: [
            { path: 'upcoming', component: UpcomingRacesComponent },
            { path: 'past', component: PastRacesComponent },
            { path: 'submit', component: SubmitRaceComponent },
            { path: '', redirectTo: 'upcoming', pathMatch: 'full' }
        ]
    },
    {
        path: 'user',
        children: [
            { path: 'profile', component: ProfileComponent },
            { path: 'settings', component: SettingsComponent },
            { path: '', redirectTo: 'profile', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '' }
];
