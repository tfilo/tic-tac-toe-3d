import { NullablePlayerMark, PlayerMark } from '../store/GameContext';

export type Result = {
    winningMarksIndex: number[];
    winner: PlayerMark;
};

class Checker {
    private playground: NullablePlayerMark[];
    private playgroundSize: number;

    constructor(playground: NullablePlayerMark[], playgroundSize: number) {
        this.playground = playground;
        this.playgroundSize = playgroundSize;
    }

    /**
     *
     * @param startIndex - first cell where to start looking for completed line
     * @param increment - function which returns how much to increment startIndex on each cycle (cycle represents column, row or level depending on direction of looking)
     * @returns - Result objekt with indexes of winning marks and winner mark
     */
    findCompletedLine = (startIndex: number, increment: (cycle: number) => number) => {
        const mark = this.playground[startIndex];
        if (mark === null) {
            return;
        }
        const winningMarksIndex: number[] = [];
        for (let cycle = 0; cycle < this.playgroundSize; cycle++) {
            const currentIndex = startIndex + increment(cycle);
            const currentMark = this.playground[currentIndex];
            if (currentMark === mark) {
                winningMarksIndex.push(currentIndex);
            } else {
                return;
            }
        }
        if (winningMarksIndex.length === this.playgroundSize) {
            return {
                winningMarksIndex,
                winner: mark
            };
        }
    };
}

export const score = (playground: NullablePlayerMark[], playgroundSize: number) => {
    const checker = new Checker(playground, playgroundSize);

    // Look for completed lines in each level
    for (let levelIdx = 0; levelIdx < playgroundSize; levelIdx++) {
        // Look for completed row in level
        for (let rowIdx = 0; rowIdx < playgroundSize; rowIdx++) {
            const result = checker.findCompletedLine(levelIdx * playgroundSize * playgroundSize + rowIdx * playgroundSize, (cycle) => {
                return cycle;
            });
            if (result) {
                return result;
            }
        }
        // Look for completed columns in level
        for (let columnIdx = 0; columnIdx < playgroundSize; columnIdx++) {
            const result = checker.findCompletedLine(levelIdx * playgroundSize * playgroundSize + columnIdx, (cycle) => {
                return playgroundSize * cycle;
            });
            if (result) {
                return result;
            }
        }
        // Look for completed diagonal in level
        let result = checker.findCompletedLine(levelIdx * playgroundSize * playgroundSize, (cycle) => {
            return playgroundSize * cycle + cycle;
        });
        if (result) {
            return result;
        }
        result = checker.findCompletedLine(levelIdx * playgroundSize * playgroundSize + (playgroundSize - 1), (cycle) => {
            return playgroundSize * cycle - cycle;
        });
        if (result) {
            return result;
        }
    }

    // Look for completed columns across levels
    for (let topLevelCellIdx = 0; topLevelCellIdx < playgroundSize * playgroundSize; topLevelCellIdx++) {
        const result = checker.findCompletedLine(topLevelCellIdx, (cycle) => {
            return playgroundSize * playgroundSize * cycle;
        });
        if (result) {
            return result;
        }
    }

    // Look for diagonals across levels
    for (let columnIdx = 0; columnIdx < playgroundSize; columnIdx++) {
        // diagonal from top rear to bottom front
        let result = checker.findCompletedLine(columnIdx, (cycle) => {
            return playgroundSize * playgroundSize * cycle + cycle * playgroundSize;
        });
        if (result) {
            return result;
        }

        // diagonal from top front to bottom rear
        result = checker.findCompletedLine(playgroundSize * (playgroundSize - 1) + columnIdx, (cycle) => {
            return playgroundSize * playgroundSize * cycle - cycle * playgroundSize;
        });
        if (result) {
            return result;
        }
    }

    // Look for diagonals across levels
    for (let rowIdx = 0; rowIdx < playgroundSize; rowIdx++) {
        // diagonal from top rear to bottom front
        let result = checker.findCompletedLine(rowIdx * playgroundSize, (cycle) => {
            return playgroundSize * playgroundSize * cycle + cycle;
        });
        if (result) {
            return result;
        }

        // diagonal from top front to bottom rear
        result = checker.findCompletedLine(rowIdx * playgroundSize + (playgroundSize - 1), (cycle) => {
            return playgroundSize * playgroundSize * cycle - cycle;
        });
        if (result) {
            return result;
        }
    }

    return undefined;
};
