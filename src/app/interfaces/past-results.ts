export interface Winner {
  name: string;
  userId?: string; // ObjectId as string, optional
}

export interface PastResults {
  _id?: string;
  tournamentYear: number;
  gold: Winner;
  silver: Winner;
  bronze: Winner;
  spotlightVideos: string[];
  createdAt?: string;
  updatedAt?: string;
}