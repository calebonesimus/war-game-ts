import Card from "./Card";
import {shuffleCards} from "./utils/cards";
import {PlayedCard} from "./types";

export default class Player {
    public name: string;
    public activeCards: Card[] = [];
    public wonCards: Card[] = [];

    constructor(name: string) {
        this.name = name
    }

    public playNextCard() {
        if (this.activeCards.length === 0) {
            this.moveWonCardsToActiveCards()
        }

        return this.activeCards.shift()
    }

    public getThreeNextCards(): Card[] {
        return this.activeCards.splice(0, 3)
    }

    public addCardToActiveCards(card: Card): void {
        this.activeCards.push(card)
    }

    public addToWonCards(cards: Card[]): void {
        this.wonCards.push(...cards)
    }

    private moveWonCardsToActiveCards(): void {
        this.activeCards = shuffleCards(this.wonCards)
    }

}
