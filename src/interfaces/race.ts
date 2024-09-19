import { User } from "./user";

export interface Race {
  _id: string;
  raceDateTime: number;
  raceSubmitted: number;

  racer1: User;
  racer2: User;
  racer3?: User;

  commentators: User[];

  completed: boolean;
  results?: RaceResult[]; 

  raceTimeId: string;

  round: 'Seeding' | 'Round 1' | 'Round 2' | 'Round 3' | 'Semifinals' | 'Final';
}

export interface RaceResult {
  racer: User;
  status: 'Finished' | 'DNF' | 'DNS' | 'DQ';

  finishTime: {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  };
}