import {GameSetResult} from "../types";
import {Table} from "console-table-printer";
import {LOG_GAME_SET_FAILED_GAMES} from "../config/logging.config";
import {NUM_GAMES_TO_PLAY} from "../config/game-set.config";

export function logGameSetStats(results: GameSetResult) {
    const rows = [
        {Stat: 'Average game duration', Value: `${results.averageGameDuration} minutes`},
        {Stat: 'Median game duration', Value: `${results.medianGameDuration} minutes`},
        {Stat: 'Mode game duration', Value: `${results.medianGameDuration} minutes`},
        {Stat: 'Longest game duration', Value: `${results.longestGameDuration} minutes`},
        {Stat: 'Shortest game duration', Value: `${results.shortestGameDuration} minutes`},
    ]

    if (LOG_GAME_SET_FAILED_GAMES) {
        const failedGamesPercentage = (results.failedGames / results.numGamesPlayed * 100).toFixed(2)
        rows.push({Stat: 'Failed games', Value: `${results.failedGames}/${NUM_GAMES_TO_PLAY} (${failedGamesPercentage}%)`})
    }

    const table = new Table({
        title: `Game Set Stats (${results.numGamesPlayed} games)`,
        columns: [
            {name: 'Stat', alignment: 'right'},
            {name: 'Value', alignment: 'left', color: 'white_bold'},
        ],
        rows,
    })

    table.printTable()
}
