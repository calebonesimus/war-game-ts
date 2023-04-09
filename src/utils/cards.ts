import Card from "../Card";

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
