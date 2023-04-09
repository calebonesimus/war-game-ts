import Player from "./src/Player";
import {Game} from "./src/Game";


const players = [
    new Player('Caleb'),
    new Player('Caroline'),
    new Player('Buddy'),
];


const game = new Game(players);

game.dealCards();

const result = game.playRound()

console.log(result)
