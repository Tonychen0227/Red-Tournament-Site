export interface User {
  _id: string;
  discordUsername: string;
  displayName: string;
  role: string;
  isAdmin: boolean;
  pronouns?:string | null;
  currentBracket?: string;
  initialPot?: string
  points?: number;
  tieBreakerValue?: number;
  currentGroup?: string;
}

export interface UserCreationInterface {
  discordUsername: string;
  displayName: string;
  role: string;
  isAdmin: boolean;
}
