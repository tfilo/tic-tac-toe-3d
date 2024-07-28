import React, { useCallback, useContext } from 'react';
import { GameContext } from '../../store/GameContext';
import Mark from './Mark';

type ColumnProps = {
    levelIdx: number;
    rowIdx: number;
    columnIdx: number;
};

const Column: React.FC<ColumnProps> = ({ columnIdx, levelIdx, rowIdx }) => {
    const { markMove, result, playground, playgroundSize } = useContext(GameContext);

    const markIndex = playgroundSize * playgroundSize * levelIdx + playgroundSize * rowIdx + columnIdx;
    const mark = playground[markIndex];
    const hasWinner = !!result;
    const isWinnerCell = result?.winningMarksIndex.includes(markIndex);

    const onMarkHandler = useCallback(() => {
        markMove(markIndex);
    }, [markIndex, markMove]);

    return (
        <button
            className={`border border-gray-300 ${
                isWinnerCell ? 'bg-green-100' : 'hover:border-gray-600 hover:bg-gray-100'
            } w-9 h-9 min-w-9 max-w-9 min-h-9 max-h-9`}
            onClick={onMarkHandler}
            disabled={hasWinner}
        >
            <Mark mark={mark} />
        </button>
    );
};

export default Column;
