import Deck from "./Deck";
import Player from "./Player";
import Card from "./Card";
import {PlayedCard, RoundResult} from "./types";

export class Game {
    public players: Player[];
    public activePlayers: Player[];
    public deck: Deck;
    public standByCards: Card[] = [];

    constructor(players: Player[]) {
        this.deck = new Deck();
        this.players = players;
        this.activePlayers = players;
    }

    public playRound(): RoundResult {
        const cardsInPlay = this.getCardFromEachPlayer()

        const winningCard = this.comparePlayedCards(cardsInPlay);

        const winner = this.getWinnerByName(winningCard.playerName);

        winner.addToWonCards(cardsInPlay.map(card => card.card));

        if (this.standByCards.length > 0) {
            winner.addToWonCards(this.standByCards);
            this.standByCards = [];
        }

        return {
            winnerName: winner.name,
            winningCard: winningCard.card,
            losingCards: cardsInPlay.filter(card => card.playerName !== winningCard.playerName).map(card => card.card)
        }

        // if cards are the same, each player adds 3 cards to the standByCards

    }

    public dealCards() {
        while (this.deck.cards.length > 0) {
            this.players.forEach(player => {
                const card = this.deck.cards.shift();
                if (card) {
                    player.addCardToActiveCards(card)
                }
            })
        }
    }

    private getCardFromEachPlayer(): PlayedCard[] {
        return this.activePlayers.map(player => {
            const card = player.playNextCard();
            // task: player should be removed if they don't have any cards
            if (card) {
                return {
                    playerName: player.name,
                    card
                }
            }
        });
    }

    private comparePlayedCards(playedCards: PlayedCard[]): PlayedCard {
        return playedCards.reduce((previousCard, currentCard) => {
            if (currentCard.card.power > previousCard.card.power) {
                return currentCard
            } else {
                return previousCard
            }
        })
    }

    private getWinnerByName(playerName: string): Player {
        return this.players.filter(player => player.name === playerName)[0]
    }
}
