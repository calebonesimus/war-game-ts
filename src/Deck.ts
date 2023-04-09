import suits from './data/suits.json'
import cardTypes from './data/cardTypes.json'
import Card from "./Card";
import {shuffleCards} from "./utils/cards";

export default class Deck {
    public cards: Card[];

    constructor() {
        this.cards = [];
        this.addCardsToDeck();
        this.cards = shuffleCards(this.cards)
    }

    addCardsToDeck() {
        suits.forEach(suit => {
            cardTypes.forEach(cardType => {
                this.cards.push(new Card(suit, cardType.face, cardType.power));
            });
        });
    }

}
