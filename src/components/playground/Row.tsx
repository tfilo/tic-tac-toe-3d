import React, { useContext } from 'react';
import Column from './Column';
import { GameContext } from '../../store/GameContext';

type RowProps = {
    levelIdx: number;
    rowIdx: number;
};

const Row: React.FC<RowProps> = ({ levelIdx, rowIdx }) => {
    const { playgroundSize } = useContext(GameContext);

    return (
        <div className='flex flex-row'>
            {new Array(playgroundSize).fill(null).map((_, columnIdx) => {
                return <Column key={columnIdx} levelIdx={levelIdx} rowIdx={rowIdx} columnIdx={columnIdx} />;
            })}
        </div>
    );
};

export default Row;
