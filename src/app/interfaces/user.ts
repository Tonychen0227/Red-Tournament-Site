export interface User {
  _id: string;
  discordUsername: string;
  displayName?: string;
  role: 'runner' | 'commentator';
  isAdmin: boolean;
  pronouns?: string | null;
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
}