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
import { AddUserComponent } from './admin-dashboard/add-user/add-user.component';
import { authGuard } from './guards/auth.guard';
import { EditRacesComponent } from './admin-dashboard/edit-races/edit-races.component';
import { PotAssignmentComponent } from './admin-dashboard/pot-assignment/pot-assignment.component';
import { EndRoundComponent } from './admin-dashboard/end-round/end-round.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'info', component: InfoComponent },
    { path: 'standings', component: StandingsComponent },
    { path: 'rules', component: RulesComponent },
    { path: 'help', component: HelpComponent },
    { path: 'admin', component: AdminDashboardComponent,
        children: [
            { path: 'races/record', component: RacesAwaitingCompletionComponent },
            { path: 'users/add', component: AddUserComponent },
            { path: 'races/edit', component: EditRacesComponent },
            { path: 'users/pots', component: PotAssignmentComponent },
            { path: 'round/end', component: EndRoundComponent },
            { path: '', redirectTo: 'record', pathMatch: 'full' }

        ] 
    },
    {
        path: 'races',
        component: RacesComponent,
        children: [
            { path: 'upcoming', component: UpcomingRacesComponent },
            { path: 'past', component: PastRacesComponent },
            { 
                path: 'submit', 
                component: SubmitRaceComponent,
                canActivate: [authGuard] 
            },
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