import {Game} from "../Game";
import {GameSetResult} from "../types";
import {average, max, median, min, mode} from "./math.utils";
import {NUM_GAMES_TO_PLAY} from "../config/game-set.config";

export function runGames(players: string[], gamesToPlay: number = NUM_GAMES_TO_PLAY): GameSetResult {
    let gameDurations = []
    let roundCounts = []
    let warCounts = []

    for (let i = 0; i < gamesToPlay; i++) {
        const game = new Game(players);

        try {
            const result = game.start();

            gameDurations.push(result.estimatedPlayTime)
            roundCounts.push(result.roundCount)
            warCounts.push(result.warCount)
        } catch (e) {
            // console.log(`Game ${i + 1} had an error`)
        }
    }

    return {
        gameDurations,
        numGamesPlayed: gameDurations.length,
        averageGameDuration: average(gameDurations),
        medianGameDuration: median(gameDurations),
        modeGameDuration: mode(gameDurations),
        longestGameDuration: max(gameDurations),
        shortestGameDuration: min(gameDurations),
        failedGames: gamesToPlay - gameDurations.length,
        averageRoundsPerGame: average(roundCounts),
        averageWarsPerGame: average(warCounts),
    }
}
