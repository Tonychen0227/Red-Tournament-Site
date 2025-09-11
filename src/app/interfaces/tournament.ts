export interface Tournament {
  _id: string;
  name: string;
  currentRound: 'Round 1' | 'Round 2' | 'Round 3' | 'Quarterfinals' | 'Semifinals' | 'Final';
}