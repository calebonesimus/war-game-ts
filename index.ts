import {exportPlayTimeFrequency} from "./src/utils/exports.utils";
import {logGameSetStats} from "./src/utils/logging.utils";
import {runGames} from "./src/utils/game-runner.utils";
import {EXPORT_GAME_DURATION_FREQUENCY} from "./src/config/exporting.config";
import {LOG_GAME_SET_STATS} from "./src/config/logging.config";

const players = [
    'Caleb',
    'Luna',
    // 'Buddy',
];

const gameSetResults = runGames(players)

LOG_GAME_SET_STATS && logGameSetStats(gameSetResults)
EXPORT_GAME_DURATION_FREQUENCY && exportPlayTimeFrequency(gameSetResults)

