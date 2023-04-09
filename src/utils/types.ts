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
