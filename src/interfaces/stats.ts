export interface BestTime {
    bestTime: number;
    racer: {
        displayName: string;
        discordUsername: string;
    };
}

export interface AverageTimePerRound {
    [round: string]: number;
}

export interface AverageTimePerBracket {
    [bracket: string]: number;  
}

export interface MostActiveCommentator {
    displayName: string;
    commentatedRaces: number;
}

export interface Stats {
    topTimes: BestTime[];
    averageTimePerRound: AverageTimePerRound;
    averageTimePerBracket: AverageTimePerBracket;
    mostActiveCommentators: MostActiveCommentator[];
}