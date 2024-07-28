import { NullablePlayerMark, PlayerMark } from '../store/GameContext';

export type Result = {
    winningMarksIndex: number[];
    winner: PlayerMark;
};

export const score = (playground: NullablePlayerMark[], playgroundSize: number) => {
    /* Look for completed row in level */
    for (let levelIdx = 0; levelIdx < playgroundSize; levelIdx++) {
        for (let rowIdx = 0; rowIdx < playgroundSize; rowIdx++) {
            const firstMarkInRowIndex = levelIdx * playgroundSize * playgroundSize + rowIdx * playgroundSize;
            const firstMarkInRow = playground[firstMarkInRowIndex];
            if (firstMarkInRow !== null) {
                const winningMarksIndex: number[] = [];
                /* Check every column of row if contains equals mark to first mark in row */
                for (let columnIdx = 0; columnIdx < playgroundSize; columnIdx++) {
                    const cellIndex = firstMarkInRowIndex + columnIdx;
                    if (firstMarkInRow !== playground[cellIndex]) {
                        break;
                    }
                    winningMarksIndex.push(cellIndex);
                }
                if (winningMarksIndex.length === playgroundSize) {
                    return {
                        winningMarksIndex,
                        winner: firstMarkInRow
                    };
                }
            }
        }
    }

    /* Look for completed columns in level */
    for (let levelIdx = 0; levelIdx < playgroundSize; levelIdx++) {
        for (let columnIdx = 0; columnIdx < playgroundSize; columnIdx++) {
            const firstMarkInColumnIndex = levelIdx * playgroundSize * playgroundSize + columnIdx;
            const firstMarkInColumn = playground[firstMarkInColumnIndex];
            if (firstMarkInColumn !== null) {
                const winningMarksIndex: number[] = [];
                /* Check every row of column if contains equals mark to first mark in column */
                for (let rowIdx = 0; rowIdx < playgroundSize; rowIdx++) {
                    const cellIndex = firstMarkInColumnIndex + rowIdx * playgroundSize;
                    if (firstMarkInColumn !== playground[cellIndex]) {
                        break;
                    }
                    winningMarksIndex.push(cellIndex);
                }
                if (winningMarksIndex.length === playgroundSize) {
                    return {
                        winningMarksIndex,
                        winner: firstMarkInColumn
                    };
                }
            }
        }
    }

    /* Look for completed diagonal in level */
    for (let levelIdx = 0; levelIdx < playgroundSize; levelIdx++) {
        /* Check diagonal from left to right (top to bottom) */
        const firstMarkInFirstRowIndex = levelIdx * playgroundSize * playgroundSize;
        const firstMarkInFirstRow = playground[firstMarkInFirstRowIndex];
        if (firstMarkInFirstRow !== null) {
            const winningMarksIndex: number[] = [];
            for (let rowIdx = 0; rowIdx < playgroundSize; rowIdx++) {
                const cellIndex = levelIdx * playgroundSize * playgroundSize + rowIdx * playgroundSize + rowIdx;
                if (firstMarkInFirstRow !== playground[cellIndex]) {
                    break;
                }
                winningMarksIndex.push(cellIndex);
            }
            if (winningMarksIndex.length === playgroundSize) {
                return {
                    winningMarksIndex,
                    winner: firstMarkInFirstRow
                };
            }
        }
        /* Check diagonal from right to left (top to bottom) */
        const lastMarkInFirstRowIndex = levelIdx * playgroundSize * playgroundSize + (playgroundSize - 1);
        const lastMarkInFirstRow = playground[lastMarkInFirstRowIndex];
        if (lastMarkInFirstRow !== null) {
            const winningMarksIndex: number[] = [];
            for (let rowIdx = 0; rowIdx < playgroundSize; rowIdx++) {
                const cellIndex = levelIdx * playgroundSize * playgroundSize + rowIdx * playgroundSize + (playgroundSize - 1 - rowIdx);
                if (lastMarkInFirstRow !== playground[cellIndex]) {
                    break;
                }
                winningMarksIndex.push(cellIndex);
            }
            if (winningMarksIndex.length === playgroundSize) {
                return {
                    winningMarksIndex,
                    winner: lastMarkInFirstRow
                };
            }
        }
    }

    /* Look for completed pillars (same spot across levels) */

    for (let topLevelCellIdx = 0; topLevelCellIdx < playgroundSize * playgroundSize; topLevelCellIdx++) {
        const topLevelCellMark = playground[topLevelCellIdx];
        if (topLevelCellMark !== null) {
            const winningMarksIndex: number[] = [];
            for (let levelIdx = 0; levelIdx < playgroundSize; levelIdx++) {
                const cellIndex = levelIdx * playgroundSize * playgroundSize + topLevelCellIdx;
                if (topLevelCellMark !== playground[cellIndex]) {
                    break;
                }
                winningMarksIndex.push(cellIndex);
            }
            if (winningMarksIndex.length === playgroundSize) {
                return {
                    winningMarksIndex,
                    winner: topLevelCellMark
                };
            }
        }
    }

    /* TODO 
        All are top to bottom:
        Look for diagonal across levels left to right, right to left, front to back, back to front
        Look for diagonal across levels (across cube) left back to right front, right back to left front, left fron to right back, right front to left front
    */

    return undefined;
};
