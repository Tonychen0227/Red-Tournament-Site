import { User } from "./user";

export interface Race {
  _id: string;

  raceTimeId?: string;

  racer1: User;
  racer2: User;
  racer3?: User;
  racer4?: User;

  raceDateTime: number; // Unix timestamp
  raceSubmitted: number; // Unix timestamp

  round: 'Round 1' | 'Round 2' | 'Round 3' | 'Quarterfinals' | 'Semifinals' | 'Final';
  bracket?: 'Normal' | 'Ascension' | 'Exhibition' | 'Playoffs';

  commentators: User[];

  completed: boolean;
  cancelled: boolean;

  restreamPlanned: boolean;
  restreamChannel: string;
  restreamer?: User; // Admin who set the restream
  
  results?: RaceResult[];

  winner?: User;
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
  dnfOrder?: number | null;
}