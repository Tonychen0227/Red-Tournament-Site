import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Globals {
    userId?: string;
    displayName?: string;
    discordUsername?: string;
    avatarUrl?: string;
    role?: string;
    isAdmin?: boolean;
}