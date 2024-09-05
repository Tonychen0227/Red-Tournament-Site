import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StandingsComponent } from './standings/standings.component';
import { UpcomingRacesComponent } from './races/upcoming-races/upcoming-races.component';
import { PastRacesComponent } from './races/past-races/past-races.component';
import { SubmitRaceComponent } from './races/submit-race/submit-race.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { RaceDetailComponent } from './races/race-detail/race-detail.component';
import { RulesComponent } from './rules/rules.component';
import { HelpComponent } from './help/help.component';
import { InfoComponent } from './info/info.component';
import { RacesAwaitingCompletionComponent } from './races/races-awaiting-completion/races-awaiting-completion.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'info', component: InfoComponent },
    { path: 'standings', component: StandingsComponent },
    { path: 'rules', component: RulesComponent },
    { path: 'help', component: HelpComponent },
    {
        path: 'races',
        children: [
            { path: 'upcoming', component: UpcomingRacesComponent },
            { path: 'complete', component: PastRacesComponent },
            { path: 'submit', component: SubmitRaceComponent },
            { path: 'past', component: RacesAwaitingCompletionComponent },
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