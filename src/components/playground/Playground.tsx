import React, { useContext } from 'react';
import { GameContext } from '../../store/GameContext';
import Level from './Level';
import Result from './Result';

const Playground: React.FC = () => {
    const { playgroundSize, isWorking, gameInProgress } = useContext(GameContext);

    return (
        <>
            <Result />
            <main className={`px-4 flex flex-col justify-center ${isWorking && 'cursor-progress'} ${!gameInProgress && 'blur-sm'}`}>
                {new Array(playgroundSize).fill(null).map((_, levelIdx) => {
                    return <Level key={levelIdx} levelIdx={levelIdx} />;
                })}
            </main>
        </>
    );
};

export default Playground;
