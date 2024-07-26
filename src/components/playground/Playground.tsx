import React, { useContext } from 'react';
import { GameContext } from '../../store/GameContext';
import Level from './Level';

const Playground: React.FC = () => {
    const { playground } = useContext(GameContext);

    return (
        <main className='p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 justify-center'>
            {playground.map((level, idx) => {
                return <Level key={idx} level={level} levelIdx={idx} />;
            })}
        </main>
    );
};

export default Playground;
