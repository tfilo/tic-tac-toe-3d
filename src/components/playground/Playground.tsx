import React, { useContext } from 'react';
import { GameContext } from '../../store/GameContext';
import Level from './Level';

const Playground: React.FC = () => {
    const { playground } = useContext(GameContext);

    return (
        <main className='px-4 flex flex-col justify-center'>
            {playground.map((level, idx) => {
                return <Level key={idx} level={level} levelIdx={idx} />;
            })}
        </main>
    );
};

export default Playground;
