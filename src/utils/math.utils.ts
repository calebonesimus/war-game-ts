export function average(durations: number[]) {
    const average = durations.reduce((total, time) => total + time, 0) / durations.length;
    return Math.ceil(average);
}

export function median(numbers: number[]): number {
    const sorted = Array.from(numbers).sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
}

export function max(numbers: number[]): number {
    return Math.max(...numbers);
}

export function min(numbers: number[]): number {
    return Math.min(...numbers);
}

export function mode(numbers: number[]): number {
    let freq = {}

    for (let item of numbers) {
        freq[item] ? freq[item]++ : freq[item] = 1
    }

    let compare = 0
    let mode

    for (let item in freq) {
        if (freq[item] > compare) {
            compare = freq[item]
            mode = item
        }
    }

    return mode;
}
