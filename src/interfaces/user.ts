export interface User {
  _id?: string;
  discordUsername: string;
  displayName: string;
  role: string;
  isAdmin: boolean;
  timezone?: number
}
