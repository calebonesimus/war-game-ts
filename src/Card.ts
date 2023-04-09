export default class Card {
    public face: string;
    public power: number;
    public name: string;

    constructor(suit, face, power) {
        this.face = face;
        this.power = power;
        this.name = `${face} of ${suit}`;
    }

}
