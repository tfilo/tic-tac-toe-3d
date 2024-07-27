import React, { useCallback, useContext } from 'react';
import { GameContext, PlayerMark } from '../../store/GameContext';
import Mark from './Mark';

type ColumnProps = {
    column: PlayerMark | null;
    levelIdx: number;
    rowIdx: number;
    columnIdx: number;
};

const Column: React.FC<ColumnProps> = ({ column, columnIdx, levelIdx, rowIdx }) => {
    const { markMove, result } = useContext(GameContext);

    const onMarkHandler = useCallback(() => {
        markMove({
            level: levelIdx,
            row: rowIdx,
            column: columnIdx
        });
    }, [columnIdx, levelIdx, markMove, rowIdx]);

    const hasWinner = !!result;
    const isWinnerColumn =
        !!result && result.winningMarks.some((mark) => mark[0] === levelIdx && mark[1] === rowIdx && mark[2] === columnIdx);

    if (hasWinner) {
        return (
            <button
                className={`border border-gray-300 text-center w-9 h-9 min-w-9 max-w-9 min-h-9 max-h-9${
                    isWinnerColumn ? ' bg-green-100' : ''
                }`}
            >
                <Mark symbol={column} />
            </button>
        );
    }

    return (
        <button
            className='border border-gray-300 hover:border-gray-600 hover:bg-gray-100 w-9 h-9 min-w-9 max-w-9 min-h-9 max-h-9'
            onClick={onMarkHandler}
        >
            <Mark symbol={column} />
        </button>
    );
};

export default Column;
