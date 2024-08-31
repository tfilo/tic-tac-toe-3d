import React, { useEffect } from 'react';
import Header from './components/header/Header';
import Controls from './components/controls/Controls';
import Playground from './components/playground/Playground';
import { GameProvider } from './store/GameContext';
import { useTranslation } from 'react-i18next';

const Game: React.FC = () => {
    const {
        t,
        i18n: { language }
    } = useTranslation();

    useEffect(() => {
        document.title = t('header.title');
        document.documentElement.lang = language;
    }, [language, t]);

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
