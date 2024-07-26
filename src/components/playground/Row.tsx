import React from 'react';
import { PlayerMark } from '../../store/GameContext';
import Col from './Col';

type RowProps = {
    row: (PlayerMark | null)[];
    levelIdx: number;
    rowIdx: number;
};

const Row: React.FC<RowProps> = ({ row, levelIdx, rowIdx }) => {
    return (
        <div className='flex flex-row'>
            {row.map((col, idx) => {
                return <Col key={idx} col={col} levelIdx={levelIdx} rowIdx={rowIdx} colIdx={idx} />;
            })}
        </div>
    );
};

export default Row;
