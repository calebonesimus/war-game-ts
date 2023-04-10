import Player from "../Player";
import Card from "../Card";

export type PlayedCard = {
    player: Player;
    card: Card;
}

export type GameResult = {
    winnerName: string;
    roundCount: number;
    warCount: number;
    estimatedPlayTime: number;
}

export type GameSetResult = {
    gameDurations: number[],
    numGamesPlayed: number;
    averageGameDuration: number;
    medianGameDuration: number;
    modeGameDuration: number;
    longestGameDuration: number;
    shortestGameDuration: number;
    failedGames: number;
    averageRoundsPerGame: number;
    averageWarsPerGame: number;
}
