import React, { useCallback, useContext } from 'react';
import { GameContext, PlayerMark } from '../../store/GameContext';
import Mark from './Mark';

type ColProps = {
    col: PlayerMark | null;
    levelIdx: number;
    rowIdx: number;
    colIdx: number;
};

const Col: React.FC<ColProps> = ({ col, colIdx, levelIdx, rowIdx }) => {
    const { mark } = useContext(GameContext);

    const onMarkHandler = useCallback(() => {
        mark({
            level: levelIdx,
            row: rowIdx,
            col: colIdx
        });
    }, [colIdx, levelIdx, mark, rowIdx]);

    return (
        <button className='border w-8 h-8 min-w-8 max-w-8 min-h-8 max-h-8' onClick={onMarkHandler}>
            <Mark symbol={col} />
        </button>
    );
};

export default Col;
