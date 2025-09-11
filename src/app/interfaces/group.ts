import { User } from './user';

export interface Group {
  _id: string;
  groupNumber: number;
  members: User[];
  round: 'Round 1' | 'Round 2' | 'Round 3' | 'Quarterfinals' | 'Semifinals' | 'Final';
  bracket: 'Normal' | 'Ascension' | 'Exhibition' | 'Playoffs';
  raceStartTime?: number | null; // Unix timestamp
}