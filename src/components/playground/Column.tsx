import React, { useCallback, useContext, useMemo, useState } from 'react';
import { GameContext } from '../../store/GameContext';
import Mark from './Mark';
import { ErrorCode } from '../../utils/errors';

type ColumnProps = {
    levelIdx: number;
    rowIdx: number;
    columnIdx: number;
};

const Column: React.FC<ColumnProps> = ({ columnIdx, levelIdx, rowIdx }) => {
    const { markMove, result, playground, playgroundSize, lastPlayed } = useContext(GameContext);
    const [errorMove, setErrorMove] = useState(false);

    const markIndex = playgroundSize * playgroundSize * levelIdx + playgroundSize * rowIdx + columnIdx;
    const mark = playground[markIndex];
    const isLastPlayed = markIndex === lastPlayed;
    const hasWinner = !!result;
    const isWinnerCell = result?.winningMarks.includes(markIndex);

    const onMarkHandler = useCallback(() => {
        try {
            markMove(markIndex);
        } catch (e: any) {
            if (e instanceof Error && e.message === ErrorCode.AlreadyUsed) {
                setErrorMove(true);
            } else {
                alert('Unknown error occured!');
                console.error(e);
            }
        }
    }, [markIndex, markMove]);

    const btnClass = useMemo(() => {
        const base = ['border', 'border-gray-300', 'w-9', 'h-9', 'min-w-9', 'max-w-9', 'min-h-9', 'max-h-9'];
        if (isWinnerCell) {
            base.push('bg-green-100');
        } else if (isLastPlayed && mark === 'o') {
            base.push('bg-blue-100');
        }
        if (errorMove) {
            base.push('animate-wiggle', 'border-gray-600');
        }
        if (!hasWinner) {
            base.push('hover:border-gray-600', 'hover:bg-gray-100');
        }
        return base.join(' ');
    }, [isWinnerCell, isLastPlayed, mark, errorMove, hasWinner]);

    return (
        <button className={btnClass} onClick={onMarkHandler} disabled={hasWinner || errorMove} onAnimationEnd={() => setErrorMove(false)}>
            <Mark mark={mark} />
        </button>
    );
};

export default Column;
