export default class Card {
    public face: string;
    public power: number;
    public name: string;
    public suit: string;

    constructor(suit, face, power) {
        this.face = face;
        this.power = power;
        this.suit = suit;
        this.name = `${face} of ${suit}`;
    }
}
