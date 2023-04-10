import Player from "./Player";
import Card from "./Card";
import {PlayedCard} from "./types";
import {Game} from "./Game";
import {BgBlack, BgRed, FgBlack, FgCyan, FgGreen, Reset, Underscore} from "./utils/console-colors.utils";
import {LOG_ALL_ROUNDS} from "./config/logging.config";
import {WAR_SACRIFICE} from "./config/game.config";

export class Round {
    public game: Game;
    public players: Player[];
    public isWar: boolean;

    public winner: Player | undefined;
    public winningCard: Card | undefined;

    constructor(game: Game, players: Player[], isWar = false) {
        this.players = players;
        this.game = game;
        this.isWar = isWar;
    }

    public start() {
        let canPlay = true;

        if (this.isWar) {
            const maxSacrifice = this.getMaxSacrifice();

            const playersToRemove = []
            this.players.forEach(player => {
                if (player.cardCount() === 0 || player.cardCount() < maxSacrifice) {
                    playersToRemove.push(player)
                    return
                }

                const cards = player.getWarSacrifice(maxSacrifice);
                this.addCardsToGameStandbyCards(cards);
            })

            this.players = this.players.filter(player => !playersToRemove.includes(player))
        }

        if (this.players.length === 1) {
            this.winner = this.players[0]
            this.winningCard = this.winner.displayNextCard()
            canPlay = false
        }

        if (canPlay) {
            const cardsInPlay = this.getCardFromEachPlayer()

            this.addCardsToGameStandbyCards(cardsInPlay.map(card => card.card));

            this.comparePlayedCards(cardsInPlay)

            const winningCards = this.comparePlayedCards(cardsInPlay);

            if (winningCards.length > 1) { // start a war
                const winningPlayers = winningCards.map(card => card.player);

                const round = new Round(this.game, winningPlayers, true);
                round.start();

                this.winner = round.winner
                this.winningCard = round.winningCard
            } else {
                const {player: winner, card} = winningCards[0];

                this.winner = winner;
                this.winningCard = card;
            }
        }

        if (!this.isWar) {
            this.game.giveStandbyCardsToPlayer(this.winner);
        }

        this.isWar ? this.game.addWar() : this.game.addRound();
        if (LOG_ALL_ROUNDS) this.logRound();
    }

    private getCardFromEachPlayer(): PlayedCard[] {
        return this.players.map(player => {
            const card = player.playNextCard();
            if (card) {
                return {
                    player,
                    card
                }
            }
        });
    }

    private comparePlayedCards(playedCards: PlayedCard[]): PlayedCard[] {
        const cardsWithEqualPower = playedCards.filter((card, index) => {
            return playedCards.some((otherCard, otherIndex) => {
                return card.card.power === otherCard.card.power && index !== otherIndex
            })
        })

        if (cardsWithEqualPower.length > 1) return cardsWithEqualPower;

        // TODO: WHY IS THIS HAPPENING???
        if (!playedCards.length) {
            throw new Error('No cards were played')
        }

        const winningCard = playedCards.reduce((previousCard, currentCard) => {
            if (currentCard.card.power > previousCard.card.power) {
                return currentCard
            } else {
                return previousCard
            }
        })

        return [winningCard];
    }

    public addCardsToGameStandbyCards(cards: Card[]) {
        this.game.standByCards.push(...cards);
    }

    private getMaxSacrifice(): number {
        return this.players.reduce((max, player) => {
            const numCards = player.cardCount();
            if (numCards > max) {
                return max;
            } else if (numCards === 1 || numCards === 0) {
                return 0;
            } else {
                return numCards - 1;
            }
        }, WAR_SACRIFICE)
    }

    public logRound() {
        if (this.isWar) {
            console.log(`${Underscore}${BgRed}${FgBlack} ---- WAR Round ${this.game.roundCount} ---- ${Reset}\n`)
        } else {
            console.log(`${Underscore}${BgBlack}${FgCyan} ---- Round ${this.game.roundCount} ---- ${Reset}\n`)
        }

        console.log(`${FgGreen}${this.winner?.name} won with ${this.winningCard.name}\n${Reset}`);
        this.players.forEach(player => {
            console.log(`${player.name} cards remaining -`)
            console.log(`${player.activeCards.length} active cards`)
            console.log(`${player.gainedCards.length} standby cards`)
            console.log('\n')
        })
    }
}
