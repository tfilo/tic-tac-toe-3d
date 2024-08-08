import { NullablePlayerMark, PlayerMark } from '../store/GameContext';
import { score } from './score';

type WinLose = [wins: number, loses: number];

const nextPlayer = (player: PlayerMark): PlayerMark => {
    if (player === 'x') {
        return 'o';
    } else {
        return 'x';
    }
};

const computeMove = (options: {
    playground: NullablePlayerMark[];
    playgroundSize: number;
    player: PlayerMark;
    playerOnTurn: PlayerMark;
    targetCellIdx: number;
    plays: number;
}): WinLose | null => {
    const { playground, playgroundSize, player, playerOnTurn, targetCellIdx, plays } = options;
    if (plays === playgroundSize * 2 - 1) {
        // Depth control
        return null;
    }
    let rating: WinLose | null = null;
    const _playground = [...playground]; // copy playground to prevent modifying original array
    if (_playground[targetCellIdx] === null) {
        _playground[targetCellIdx] = playerOnTurn;
        const res = score(_playground, playgroundSize);
        if (res === undefined) {
            // go deeper
            for (let cellIdx = 0; cellIdx < _playground.length; cellIdx++) {
                const nextMoveRating = computeMove({
                    playground: _playground,
                    playgroundSize,
                    player,
                    playerOnTurn: nextPlayer(playerOnTurn),
                    targetCellIdx: cellIdx,
                    plays: plays + 1
                });
                if (nextMoveRating !== null) {
                    if (rating === null) {
                        rating = nextMoveRating;
                    } else {
                        rating[0] += nextMoveRating[0];
                        rating[1] += nextMoveRating[1];
                    }
                }
                // if (plays === 1) {
                //     console.log(
                //         'Completed ' +
                //             Math.round(
                //                 (100 / playground.length) * targetCellIdx + ((100 / playground.length) * cellIdx) / playground.length
                //             ) +
                //             '%'
                //     );
                // }
            }
        } else {
            if (res.winner === player) {
                return [1, 0];
            } else {
                return [0, 1];
            }
        }
        return rating;
    }
    return null;
};

export const play = (playground: NullablePlayerMark[], playgroundSize: number, player: PlayerMark): number | null => {
    const moveRatings: [cellIdx: number, rating: WinLose][] = [];
    for (let cellIdx = 0; cellIdx < playground.length; cellIdx++) {
        const rating = computeMove({ playground, playgroundSize, player, playerOnTurn: player, targetCellIdx: cellIdx, plays: 1 });
        if (rating !== null) {
            moveRatings.push([cellIdx, rating]);
        }
    }
    const nextMove = moveRatings
        .sort((a, b) => {
            const result = a[1][1] - b[1][1];
            if (result === 0) {
                return b[1][0] - a[1][0];
            }
            return result;
        })
        .find(() => true)?.[0];
    if (nextMove === undefined) {
        // No winning strategy, play at least any free cell
        for (let cellIdx = 0; cellIdx < playground.length; cellIdx++) {
            if (playground[cellIdx] === null) {
                return cellIdx;
            }
        }
        return null;
    }
    return nextMove;
};
