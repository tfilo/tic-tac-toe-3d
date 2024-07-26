import React from 'react';
import Header from './components/header/Header';
import Controls from './components/controls/Controls';
import Playground from './components/playground/Playground';
import GameProvider from './store/GameContext';

const Game: React.FC = () => {
    return (
        <GameProvider>
            <div className='w-full h-full pl-72 min-w-[640px]'>
                <Header />
                <Controls />
                <Playground />
            </div>
        </GameProvider>
    );
};

export default Game;
