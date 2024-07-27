import React, { useContext } from 'react';
import { GameContext, PlayerMark } from '../../store/GameContext';
import Row from './Row';

type LevelProsp = {
    level: (PlayerMark | null)[][];
    levelIdx: number;
};

const Level: React.FC<LevelProsp> = ({ level, levelIdx }) => {
    const { playgroundSize } = useContext(GameContext);

    return (
        <section
            className='flex justify-center level-wrapper'
            style={{
                height: `${32 * playgroundSize}px`
            }}
        >
            <div className='flex flex-col border level'>
                {level.map((row, idx) => {
                    return <Row key={idx} row={row} levelIdx={levelIdx} rowIdx={idx} />;
                })}
            </div>
        </section>
    );
};

export default Level;
