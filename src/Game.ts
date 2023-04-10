import Player from "./Player";
import {Round} from "./Round";
import Deck from "./Deck";
import Card from "./Card";
import {GameResult} from "./types";
import {ESTIMATED_ROUND_TIME, ESTIMATED_WAR_TIME} from "./config/time-estimate.config";

export class Game {
    public initialCards: Card[];
    public deck: Deck = new Deck();
    public activePlayers: Player[];
    public allPlayers: Player[];
    public standByCards: Card[] = [];

    public warCount: number = 0;
    public roundCount: number = 0;

    constructor(playerNames: string[]) {
        this.activePlayers = playerNames.map(name => new Player(name));
        this.allPlayers = this.activePlayers;
        this.initialCards = [...this.deck.cards];
    }

    public start(): GameResult {
        this.dealCards();

        while (this.activePlayers.length > 1) {
            const totalCards = this.getCardCount()
            if (totalCards !== 52) {
                throw new Error('Something went wrong, the total cards in play is not 52')
            }

            const round = new Round(this, this.activePlayers);
            round.start();

            this.activePlayers = this.activePlayers.filter(player => player.cardCount() > 0);
        }

        return {
            winnerName: this.activePlayers[0].name,
            roundCount: this.roundCount,
            warCount: this.warCount,
            estimatedPlayTime: this.estimatePlayTime(),
        }
    }

    public dealCards() {
        while (this.deck.cards.length > 0) {
            this.activePlayers.forEach(player => {
                const card = this.deck.cards.shift();
                if (card) {
                    player.addCardToActiveCards(card)
                }
            })
        }
    }

    public removePlayer(player: Player): void {
        this.activePlayers = this.activePlayers.filter(p => p !== player);
    }

    public giveStandbyCardsToPlayer(player: Player) {
        player.addToGainedCards(this.standByCards);
        this.standByCards = [];
    }

    public getCardCount(): number {
        const playerCardsCount = this.activePlayers.reduce((total, player) => total + player.cardCount(), 0)
        return playerCardsCount + this.standByCards.length
    }

    public addRound() {
        this.roundCount++;
    }

    public addWar() {
        this.warCount++;
    }

    /**
     * Estimate the play time in minutes
     */
    public estimatePlayTime(): number {
        return Math.ceil((this.roundCount * ESTIMATED_ROUND_TIME + this.warCount * ESTIMATED_WAR_TIME) / 60)
    }
}
