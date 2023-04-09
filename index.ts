import {Game} from "./src/Game";
import * as fs from 'fs';


const players = [
    'Caleb',
    'Luna',
    // 'Milo',
    // 'Mia',
    // 'Lily',
    // 'Oliver',
    // 'Ava',
    // 'Isabella',
];

const gamesToPlay = 100000;
let playTimes = []

function median(numbers: number[]): number {
    const sorted = Array.from(numbers).sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
}

function getAveragePlayTimes(durations: number[]) {
    const average = durations.reduce((total, time) => total + time, 0) / durations.length;
    return Math.ceil(average);
}

for (let i = 0; i < gamesToPlay; i++) {
    const game = new Game(players);

    try {
        const result = game.start();
        // console.log(`Game ${i + 1} won by ${result.winnerName}`);
        playTimes.push(result.estimatedPlayTime)
    } catch (e) {
        // console.log(`Game ${i + 1} had an error`)
    }
}

const failedGames = gamesToPlay - playTimes.length;

// console.log('------------------------------------\n')
console.log(`Average play time: ${getAveragePlayTimes(playTimes)} minutes\n`)
console.log(`Median play time: ${median(playTimes)} minutes\n`)
console.log(`Longest game: ${Math.max(...playTimes)} minutes\n`)
console.log(`Shortest game: ${Math.min(...playTimes)} minutes\n`)
console.log(`Failed games: ${failedGames} (${failedGames / gamesToPlay * 100}%})`)

const counts = {};

for (const num of playTimes) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
}

const csv = 'playTime,frequency\n' + Object.keys(counts).map(time => {
    return `${time},${counts[time]}`
}).join('\n')

fs.writeFile(`${__dirname}/exports/${Date.now()}.csv`, csv, 'utf8', function(err) {
    if (err) {
        console.log(err);
        console.log('Some error occurred - file either not saved or corrupted file saved.');
    } else {
        console.log('It\'s saved!');
    }
});



