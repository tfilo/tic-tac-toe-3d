import { NullablePlayerMark, PlayerMark } from '../store/GameContext';

type LineResult = {
    score: number;
    winningMarks: number[];
};

export type ScoreResult = LineResult;

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
    findCompletedLine = (player: PlayerMark, startIndex: number, increment: (cycle: number) => number): LineResult => {
        const winningMarks: number[] = [];
        let score = 0;
        for (let cycle = 0; cycle < this.playgroundSize; cycle++) {
            const currentIndex = startIndex + increment(cycle);
            const currentMark = this.playground[currentIndex];
            if (currentMark === null) {
                continue;
            }
            if (currentMark !== player) {
                return {
                    score: 0,
                    winningMarks: []
                };
            }
            score++;
            winningMarks.push(currentIndex);
        }
        return {
            score,
            winningMarks: winningMarks.length === this.playgroundSize ? winningMarks : []
        };
    };
}

export const score = (player: PlayerMark, playground: NullablePlayerMark[], playgroundSize: number): ScoreResult => {
    const checker = new Checker(playground, playgroundSize);
    const winningMarks: Set<number> = new Set();
    let score = 0;
    // Look for completed lines in each level
    for (let levelIdx = 0; levelIdx < playgroundSize; levelIdx++) {
        // Look for completed row in level
        for (let rowIdx = 0; rowIdx < playgroundSize; rowIdx++) {
            const result = checker.findCompletedLine(
                player,
                levelIdx * playgroundSize * playgroundSize + rowIdx * playgroundSize,
                (cycle) => {
                    return cycle;
                }
            );
            score += result.score;
            result.winningMarks.forEach((wm) => winningMarks.add(wm));
        }
        // Look for completed columns in level
        for (let columnIdx = 0; columnIdx < playgroundSize; columnIdx++) {
            const result = checker.findCompletedLine(player, levelIdx * playgroundSize * playgroundSize + columnIdx, (cycle) => {
                return playgroundSize * cycle;
            });
            score += result.score;
            result.winningMarks.forEach((wm) => winningMarks.add(wm));
        }
        // Look for completed diagonal in level
        let result = checker.findCompletedLine(player, levelIdx * playgroundSize * playgroundSize, (cycle) => {
            return playgroundSize * cycle + cycle;
        });
        score += result.score;
        result.winningMarks.forEach((wm) => winningMarks.add(wm));
        result = checker.findCompletedLine(player, levelIdx * playgroundSize * playgroundSize + (playgroundSize - 1), (cycle) => {
            return playgroundSize * cycle - cycle;
        });
        score += result.score;
        result.winningMarks.forEach((wm) => winningMarks.add(wm));
    }

    // Look for completed columns across levels
    for (let topLevelCellIdx = 0; topLevelCellIdx < playgroundSize * playgroundSize; topLevelCellIdx++) {
        const result = checker.findCompletedLine(player, topLevelCellIdx, (cycle) => {
            return playgroundSize * playgroundSize * cycle;
        });
        score += result.score;
        result.winningMarks.forEach((wm) => winningMarks.add(wm));
    }

    // Look for diagonals across levels
    for (let columnIdx = 0; columnIdx < playgroundSize; columnIdx++) {
        // diagonal from top rear to bottom front
        let result = checker.findCompletedLine(player, columnIdx, (cycle) => {
            return playgroundSize * playgroundSize * cycle + cycle * playgroundSize;
        });
        score += result.score;
        result.winningMarks.forEach((wm) => winningMarks.add(wm));

        // diagonal from top front to bottom rear
        result = checker.findCompletedLine(player, playgroundSize * (playgroundSize - 1) + columnIdx, (cycle) => {
            return playgroundSize * playgroundSize * cycle - cycle * playgroundSize;
        });
        score += result.score;
        result.winningMarks.forEach((wm) => winningMarks.add(wm));
    }

    // Look for diagonals across levels
    for (let rowIdx = 0; rowIdx < playgroundSize; rowIdx++) {
        // diagonal from top rear to bottom front
        let result = checker.findCompletedLine(player, rowIdx * playgroundSize, (cycle) => {
            return playgroundSize * playgroundSize * cycle + cycle;
        });
        score += result.score;
        result.winningMarks.forEach((wm) => winningMarks.add(wm));

        // diagonal from top front to bottom rear
        result = checker.findCompletedLine(player, rowIdx * playgroundSize + (playgroundSize - 1), (cycle) => {
            return playgroundSize * playgroundSize * cycle - cycle;
        });
        score += result.score;
        result.winningMarks.forEach((wm) => winningMarks.add(wm));
    }

    // Look for 4 possible diagonals across cube

    let result = checker.findCompletedLine(player, 0, (cycle) => {
        return playgroundSize * playgroundSize * cycle + cycle * playgroundSize + cycle;
    });
    score += result.score;
    result.winningMarks.forEach((wm) => winningMarks.add(wm));

    result = checker.findCompletedLine(player, playgroundSize - 1, (cycle) => {
        return playgroundSize * playgroundSize * cycle + cycle * playgroundSize - cycle;
    });
    score += result.score;
    result.winningMarks.forEach((wm) => winningMarks.add(wm));

    result = checker.findCompletedLine(player, playgroundSize * playgroundSize - playgroundSize, (cycle) => {
        return playgroundSize * playgroundSize * cycle - cycle * playgroundSize + cycle;
    });
    score += result.score;
    result.winningMarks.forEach((wm) => winningMarks.add(wm));

    result = checker.findCompletedLine(player, playgroundSize * playgroundSize - 1, (cycle) => {
        return playgroundSize * playgroundSize * cycle - cycle * playgroundSize - cycle;
    });
    score += result.score;
    result.winningMarks.forEach((wm) => winningMarks.add(wm));

    return {
        score,
        winningMarks: Array.from(winningMarks)
    };
};
