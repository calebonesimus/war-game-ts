import Player from "./Player";
import Card from "./Card";

export type PlayedCard = {
    playerName: string;
    card: Card;
}

export type RoundResult = {
    winnerName: string;
    winningCard: Card;
    losingCards: Card[];
}
