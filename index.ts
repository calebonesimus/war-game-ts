import {exportPlayTimeFrequency} from "./src/utils/exports.utils";
import {logGameSetStats} from "./src/utils/logging.utils";
import {runGames} from "./src/utils/game-runner.utils";
import {EXPORT_GAME_SET_RESULTS, LOG_GAME_SET_STATS} from "./src/constants";

const players = [
    'Caleb',
    'Luna',
    // 'Buddy',
];

const gameSetResults = runGames(players)

LOG_GAME_SET_STATS && logGameSetStats(gameSetResults)
EXPORT_GAME_SET_RESULTS && exportPlayTimeFrequency(gameSetResults)

