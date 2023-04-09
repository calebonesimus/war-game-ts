import Deck from "./Deck";
import Player from "./Player";
import Card from "./Card";
import {PlayedCard} from "./types";
import {Game} from "./Game";
import {Reset, FgGreen, Underscore, BgBlack, FgWhite, FgCyan} from "./data/consoleColors";

export class Round {
    public game: Game;
    public players: Player[];

    public winner: Player | undefined;
    public winningCard: Card | undefined;

    constructor(game: Game, players: Player[]) {
        this.players = players;
        this.game = game;
    }

    public start() {
        const cardsInPlay = this.getCardFromEachPlayer()

        const {player: winner, card} = this.comparePlayedCards(cardsInPlay);

        winner.addToStandbyCards(cardsInPlay.map(card => card.card));

        // if (this.game.standByCards.length > 0) {
        //     winner.addToStandbyCards(this.game.standByCards);
        //     this.game.standByCards = [];
        // }

        this.winner = winner;
        this.winningCard = card;

        this.logRound();
    }

    private getCardFromEachPlayer(): PlayedCard[] {
        return this.players.map(player => {
            const card = player.playNextCard();
            // task: player should be removed if they don't have any cards
            if (card) {
                return {
                    player,
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

    public logRound() {
        console.log(`${Underscore}${BgBlack}${FgCyan} ---- Round ${this.game.rounds.length + 1} ---- ${Reset}\n`)
        console.log(`${FgGreen}${this.winner?.name} won with ${this.winningCard.name}\n${Reset}`);
        this.players.forEach(player => {
            console.log(`${player.name} cards remaining:`)
            console.log(`${player.activeCards.length} active cards`)
            console.log(`${player.standbyCards.length} standby cards`)
            console.log('\n')
        })
    }
}
