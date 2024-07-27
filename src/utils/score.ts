import { PlayerMark } from '../store/GameContext';

export type WinningMark = [level: number, row: number, column: number];
export type Result = {
    winningMarks: WinningMark[];
    player: PlayerMark;
};

const checkRows = (level: (PlayerMark | null)[][], levelIdx: number): Result | undefined => {
    for (let rowIdx = 0; rowIdx < level.length; rowIdx++) {
        const mark = level[rowIdx][0];
        if (mark !== null) {
            const result: WinningMark[] = [];
            for (let colIdx = 0; colIdx < level.length; colIdx++) {
                result.push([levelIdx, rowIdx, colIdx]);
                if (mark === level[rowIdx][colIdx]) {
                    if (colIdx === level.length - 1) {
                        return {
                            winningMarks: result,
                            player: mark
                        };
                    }
                } else {
                    break;
                }
            }
        }
    }
};

const checkCols = (level: (PlayerMark | null)[][], levelIdx: number): Result | undefined => {
    for (let colIdx = 0; colIdx < level.length; colIdx++) {
        const mark = level[0][colIdx];
        if (mark !== null) {
            const result: WinningMark[] = [];
            for (let rowIdx = 0; rowIdx < level.length; rowIdx++) {
                result.push([levelIdx, rowIdx, colIdx]);
                if (mark === level[rowIdx][colIdx]) {
                    if (rowIdx === level.length - 1) {
                        return {
                            winningMarks: result,
                            player: mark
                        };
                    }
                } else {
                    break;
                }
            }
        }
    }
};

export const score = (playground: (PlayerMark | null)[][][]) => {
    const res = playground.map((level, levelIdx) => {
        let res = checkRows(level, levelIdx);
        if (res === undefined) {
            res = checkCols(level, levelIdx);
        }
        return res;
    });

    const winner = res.find((res) => !!res);
    return winner;
};
