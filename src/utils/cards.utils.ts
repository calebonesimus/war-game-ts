import Card from "../Card";
import suits from "../data/suits.json";
import cardTypes from "../data/cardTypes.json";

export function shuffleCards(cards: Card[]) {
    const cardsCopy = [...cards]
    let currentIndex = cards.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [cardsCopy[currentIndex], cardsCopy[randomIndex]] = [cardsCopy[randomIndex], cardsCopy[currentIndex]];
    }

    return cardsCopy;
}

export function createShuffledDeck() {
    return shuffleCards(createCards())
}

function createCards() {
    const cards = []

    suits.forEach(suit => {
        cardTypes.forEach(cardType => {
            cards.push(new Card(suit, cardType.face, cardType.power));
        });
    });

    return cards;
}
