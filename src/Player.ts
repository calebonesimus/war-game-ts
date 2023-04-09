import Card from "./Card";
import {shuffleCards} from "./utils/cards";

export default class Player {
    public name: string;
    public activeCards: Card[] = [];
    public gainedCards: Card[] = [];

    constructor(name: string) {
        this.name = name
    }

    public playNextCard() {
        if (this.activeCards.length === 0) {
            this.moveGainedCardsToActiveCards()
        }

        return this.activeCards.shift()
    }

    public displayNextCard() {
        if (this.activeCards.length === 0) {
            this.moveGainedCardsToActiveCards()
        }

        return this.activeCards[0]
    }

    public getWarSacrifice(numCards = 3): Card[] {
        if (this.activeCards.length === 0) {
            this.moveGainedCardsToActiveCards()
        }

        return this.activeCards.splice(0, numCards)
    }

    public addCardToActiveCards(card: Card): void {
        this.activeCards.push(card)
    }

    public addToGainedCards(cards: Card[]): void {
        this.gainedCards.push(...cards)
    }

    public cardCount(): number {
        return this.activeCards.length + this.gainedCards.length
    }

    private moveGainedCardsToActiveCards(): void {
        this.activeCards = shuffleCards(this.gainedCards)
        this.gainedCards = []
    }

}
