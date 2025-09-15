export interface User {
  _id: string;
  discordUsername: string;
  displayName?: string;
  role: 'runner' | 'commentator';
  isAdmin: boolean;
  pronouns?: string | null;
  country?: string | null | undefined; // ISO 3166-1 alpha-2 country code
  currentBracket?: 'Playoffs' | 'Exhibition' | 'Ascension' | 'Normal';
  points?: number;
  bestTournamentTimeMilliseconds?: number;
  currentGroup?: string; // ObjectId as string
  // Frontend-only properties (not in backend model)
  setFirstPickems?: boolean;
  rank?: number;
}

export interface UserCreationInterface {
  discordUsername: string;
  displayName?: string;
  role: 'runner' | 'commentator';
  isAdmin: boolean;
  pronouns?: string | null;
  country?: string | null | undefined; // ISO 3166-1 alpha-2 country code
}