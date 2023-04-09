import Card from "./Card";
import {shuffleCards} from "./utils/cards";
import {PlayedCard} from "./types";

export default class Player {
    public name: string;
    public activeCards: Card[] = [];
    public standbyCards: Card[] = [];

    constructor(name: string) {
        this.name = name
    }

    public playNextCard() {
        if (this.activeCards.length === 0) {
            this.moveStandbyCardsToActiveCards()
        }

        return this.activeCards.shift()
    }

    public getThreeNextCards(): Card[] {
        return this.activeCards.splice(0, 3)
    }

    public addCardToActiveCards(card: Card): void {
        this.activeCards.push(card)
    }

    public addToStandbyCards(cards: Card[]): void {
        this.standbyCards.push(...cards)
    }

    private moveStandbyCardsToActiveCards(): void {
        this.activeCards = shuffleCards(this.standbyCards)
        this.standbyCards = []
    }

}
