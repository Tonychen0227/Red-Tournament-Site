import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

import { HomeComponent } from './home/home.component';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RacesAwaitingCompletionComponent } from './admin-dashboard/races-awaiting-completion/races-awaiting-completion.component';
import { RacesComponent } from './races/races.component';
import { AddUserComponent } from './admin-dashboard/add-user/add-user.component';
import { EditRacesComponent } from './admin-dashboard/edit-races/edit-races.component';
import { PotAssignmentComponent } from './admin-dashboard/pot-assignment/pot-assignment.component';
import { EndRoundComponent } from './admin-dashboard/end-round/end-round.component';

import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

import { InfoComponent } from './info/info.component';
import { RulesComponent } from './rules/rules.component';
import { HelpComponent } from './help/help.component';

import { StandingsComponent } from './standings/standings.component';
import { UpcomingRacesComponent } from './races/upcoming-races/upcoming-races.component';
import { PastRacesComponent } from './races/past-races/past-races.component';
import { SubmitRaceComponent } from './races/submit-race/submit-race.component';
import { RaceDetailComponent } from './races/race-detail/race-detail.component';

import { GroupsComponent } from './groups/groups.component';
import { GroupCreationComponent } from './admin-dashboard/group-creation/group-creation.component';

import { PickemsDashboardComponent } from './pickems-dashboard/pickems-dashboard.component';
import { PickemsAdminDashboardComponent } from './pickems-dashboard/pickems-admin-dashboard/pickems-admin-dashboard.component';
import { PickemsLeaderboardComponent } from './pickems-dashboard/pickems-leaderboard/pickems-leaderboard.component';
import { PickemsPicksComponent } from './pickems-dashboard/pickems-picks/pickems-picks.component';
import { PickemsRacesComponent } from './pickems-dashboard/pickems-races/pickems-races.component';
import { PickemsTournamentComponent } from './pickems-dashboard/pickems-tournament/pickems-tournament.component';
import { PickemsStatsComponent } from './pickems-dashboard/pickems-stats/pickems-stats.component';
import { StatsComponent } from './stats/stats.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'info', component: InfoComponent },
    { path: 'standings', component: StandingsComponent },
    { path: 'groups', component: GroupsComponent },
    { path: 'rules', component: RulesComponent },
    { path: 'help', component: HelpComponent },
    { path: 'admin', component: AdminDashboardComponent,
        canActivate: [adminGuard],
        children: [
            { path: 'races/record', component: RacesAwaitingCompletionComponent },
            { path: 'users/add', component: AddUserComponent },
            { path: 'races/upcoming/edit', component: EditRacesComponent },
            // { path: 'races/past/edit', component: EditRaceResultsComponent },
            { path: 'users/pots', component: PotAssignmentComponent },
            { path: 'round/end', component: EndRoundComponent },
            { path: 'groups/add', component: GroupCreationComponent },
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
            { path: ':discordUsername', component: ProfileComponent },
            { path: '', redirectTo: 'profile', pathMatch: 'full' },
            { path: '**', redirectTo: 'profile' }
        ]
    },
    {
        path: 'pickems',
        component: PickemsDashboardComponent,
        children: [
            { path: 'first-visit', component: PickemsTournamentComponent },
            { path: 'admin', component: PickemsAdminDashboardComponent },
            { path: 'leaderboard', component: PickemsLeaderboardComponent },
            { path: 'submit', component: PickemsRacesComponent },
            { path: 'picks', component: PickemsPicksComponent },
            { path: 'stats', component: PickemsStatsComponent },
            { path: '', redirectTo: 'leaderboard', pathMatch: 'full' }
        ]
    },
    { path: 'stats', component: StatsComponent },
    { path: '**', redirectTo: '' }
];