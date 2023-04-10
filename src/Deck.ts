import Card from "./Card";
import {createShuffledDeck} from "./utils/cards.utils";

export default class Deck {
    public cards: Card[];

    constructor() {
        this.cards = createShuffledDeck()
    }
}
