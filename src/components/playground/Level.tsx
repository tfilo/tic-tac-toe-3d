import React, { useContext } from 'react';
import { GameContext } from '../../store/GameContext';
import Row from './Row';

type LevelProsp = {
    levelIdx: number;
};

const Level: React.FC<LevelProsp> = ({ levelIdx }) => {
    const { playgroundSize } = useContext(GameContext);

    return (
        <section
            className='flex justify-center level-wrapper'
            style={{
                height: `${32 * playgroundSize}px`
            }}
        >
            <div className='flex flex-col border level'>
                {new Array(playgroundSize).fill(null).map((_, rowIdx) => {
                    return <Row key={rowIdx} levelIdx={levelIdx} rowIdx={rowIdx} />;
                })}
            </div>
        </section>
    );
};

export default Level;
