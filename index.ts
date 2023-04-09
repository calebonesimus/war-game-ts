import Player from "./src/Player";
import {Round} from "./src/Round";
import {Game} from "./src/Game";


const players = [
    new Player('Caleb'),
    new Player('Luna'),
    // new Player('Buddy'),
];

const game = new Game(players);

game.start()

