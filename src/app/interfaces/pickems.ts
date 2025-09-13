import { User } from './user';

export interface Pickems {
  _id: string;
  userId: string; // ObjectId as string
  
  top27: User[];
  top9: User[];
  
  overallWinner?: User;
  
  bestTimeWho?: User;
  
  closestTime?: number; // Closest time guess in milliseconds

  round1Picks: User[];
  round2Picks: User[];
  round3Picks: User[];
  quarterFinalsPicks: User[];
  semiFinalsPicks: User[];
  finalPick?: User;
  
  points: number;
  top27PointsAwarded: boolean;
  top9PointsAwarded: boolean;
}