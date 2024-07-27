import React from 'react';
import { PlayerMark } from '../../store/GameContext';
import Column from './Column';

type RowProps = {
    row: (PlayerMark | null)[];
    levelIdx: number;
    rowIdx: number;
};

const Row: React.FC<RowProps> = ({ row, levelIdx, rowIdx }) => {
    return (
        <div className='flex flex-row'>
            {row.map((column, idx) => {
                return <Column key={idx} column={column} levelIdx={levelIdx} rowIdx={rowIdx} columnIdx={idx} />;
            })}
        </div>
    );
};

export default Row;
