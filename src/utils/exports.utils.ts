import fs from "fs";
import {NUM_GAMES_TO_PLAY} from "../constants";
import {GameSetResult} from "../types";
import {FgGreen, Reset} from "./console-colors.utils";

function createExportFileName() {
    return `${__dirname}/../../exports/${NUM_GAMES_TO_PLAY}-rounds-${Date.now()}.csv`
}

export function exportPlayTimeFrequency(results: GameSetResult) {
    const counts = {};

    for (const num of results.gameDurations) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    const csv = 'playTime,frequency\n' + Object.keys(counts).map(time => {
        return `${time},${counts[time]}`
    }).join('\n')

    fs.writeFile(createExportFileName(), csv, 'utf8', function(err) {
        if (err) {
            console.log('Some error occurred - file either not saved or corrupted file saved.');
            console.error(err);
        } else {
            console.log(`${FgGreen}Game Stats Exported!${Reset}`);
        }
    });
}
