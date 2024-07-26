import React from 'react';
import { PlayerMark } from '../../store/GameContext';
import Row from './Row';

type LevelProsp = {
    level: (PlayerMark | null)[][];
    levelIdx: number;
};

const Level: React.FC<LevelProsp> = ({ level, levelIdx }) => {
    return (
        <section className='text-center'>
            <h2>Level {levelIdx + 1}</h2>
            <div className='flex justify-center'>
                <div className='flex flex-col border'>
                    {level.map((row, idx) => {
                        return <Row key={idx} row={row} levelIdx={levelIdx} rowIdx={idx} />;
                    })}
                </div>
            </div>
        </section>
    );
};

export default Level;
