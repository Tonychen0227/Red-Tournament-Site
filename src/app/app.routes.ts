import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { StandingsComponent } from './standings/standings.component';
import { UpcomingRacesComponent } from './races/upcoming-races/upcoming-races.component';
import { PastRacesComponent } from './races/past-races/past-races.component';
import { SubmitRaceComponent } from './races/submit-race/submit-race.component';
import { RaceDetailComponent } from './races/race-detail/race-detail.component';

import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

import { InfoComponent } from './info/info.component';
import { RulesComponent } from './rules/rules.component';
import { HelpComponent } from './help/help.component';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RacesAwaitingCompletionComponent } from './admin-dashboard/races-awaiting-completion/races-awaiting-completion.component';
import { RacesComponent } from './races/races.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'info', component: InfoComponent },
    { path: 'standings', component: StandingsComponent },
    { path: 'rules', component: RulesComponent },
    { path: 'help', component: HelpComponent },
    { path: 'admin', component: AdminDashboardComponent,
        children: [
            { path: 'record', component: RacesAwaitingCompletionComponent },

        ] 
    },
    {
        path: 'races',
        component: RacesComponent,
        children: [
            { path: 'upcoming', component: UpcomingRacesComponent },
            { path: 'past', component: PastRacesComponent },
            { path: 'submit', component: SubmitRaceComponent },
            { path: ':id', component: RaceDetailComponent },
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