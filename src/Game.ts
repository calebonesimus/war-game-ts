import Player from "./Player";
import {Round} from "./Round";
import Deck from "./Deck";
import Card from "./Card";

export class Game {
    public deck: Deck;
    public players: Player[];
    public rounds: Round[] = [];
    public standByCards: Card[] = [];

    constructor(players: Player[]) {
        this.deck = new Deck();
        this.players = players;
    }

    public start() {
        this.dealCards();

        const roundLimit = 1000;
        while (this.players.length > 1 && this.rounds.length < roundLimit) {
            const round = new Round(this, this.players);
            round.start();

            const totalCards = this.players.reduce((total, player) => total + player.activeCards.length + player.standbyCards.length, 0);
            if (totalCards !== 52) {
                throw new Error('Something went wrong, the total cards in play is not 52')
            }

            this.rounds.push(round);
            this.players = this.players.filter(player => player.activeCards.length > 0 || player.standbyCards.length > 0);
        }
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
}
