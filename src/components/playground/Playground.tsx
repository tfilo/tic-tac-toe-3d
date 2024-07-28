import React, { useContext } from 'react';
import { GameContext } from '../../store/GameContext';
import Level from './Level';

const Playground: React.FC = () => {
    const { playgroundSize } = useContext(GameContext);

    return (
        <main className='px-4 flex flex-col justify-center'>
            {new Array(playgroundSize).fill(null).map((_, levelIdx) => {
                return <Level key={levelIdx} levelIdx={levelIdx} />;
            })}
        </main>
    );
};

export default Playground;
