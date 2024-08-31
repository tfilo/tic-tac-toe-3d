import { NullablePlayerMark, PlayerMark } from '../store/GameContext';
import { score } from './score';

type PlayersScore = [playerScore: number, oponentScore: number];

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
}): PlayersScore | null => {
    const { playground, playgroundSize, player, playerOnTurn, targetCellIdx, plays } = options;
    if (plays > 1) {
        // Depth control
        return null;
    }
    const playersScore: PlayersScore = [0, 0];
    const _playground = [...playground]; // copy playground to prevent modifying original array
    if (_playground[targetCellIdx] === null) {
        _playground[targetCellIdx] = player;
        let { score: playerScore, winningMarks: playerWinningMarks } = score(player, _playground, playgroundSize);
        let { score: oponentScore, winningMarks: oponentWinningMarks } = score(nextPlayer(player), _playground, playgroundSize);
        playersScore[0] += playerScore;
        playersScore[1] += oponentScore;
        if (playerWinningMarks.length === 0 && oponentWinningMarks.length === 0) {
            // If no winner yet, play one more
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
                    playersScore[0] += nextMoveRating[0];
                    playersScore[1] += nextMoveRating[1];
                }
            }
        } else {
            if (playerWinningMarks.length > 0) {
                return [Number.MAX_SAFE_INTEGER, oponentScore];
            }
            if (oponentWinningMarks.length > 0) {
                return [playerScore, Number.MAX_SAFE_INTEGER];
            }
        }
        return playersScore;
    }
    return null;
};

export const play = async (playground: NullablePlayerMark[], playgroundSize: number, player: PlayerMark): Promise<number | null> => {
    const moveRatings: [cellIdx: number, rating: PlayersScore][] = [];

    for (let targetCellIdx = 0; targetCellIdx < playground.length; targetCellIdx++) {
        const result = await new Promise<[cellIdx: number, rating: PlayersScore] | null>((resolve) => {
            // Making this part asynchronous with 1ms timeout prevents GUI freezing while calculating move.
            setTimeout(() => {
                const rating = computeMove({
                    playground,
                    playgroundSize,
                    player,
                    playerOnTurn: nextPlayer(player),
                    targetCellIdx,
                    plays: 0
                });
                if (rating !== null) {
                    resolve([targetCellIdx, rating]);
                } else {
                    resolve(null);
                }
            }, 1);
        });
        if (result !== null) {
            moveRatings.push(result);
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
