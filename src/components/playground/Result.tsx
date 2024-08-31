import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../store/GameContext';
import Mark from './Mark';
import { useTranslation } from 'react-i18next';

const Result: React.FC = () => {
    const { result, playground } = useContext(GameContext);
    const [isOpen, setIsOpen] = useState(true);
    const { t } = useTranslation();
    const hasResult = !!result;

    useEffect(() => {
        if (hasResult) {
            setIsOpen(true);
        }
    }, [hasResult]);

    if (result === undefined || isOpen === false) {
        return null;
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-50 backdrop-blur-sm'>
            <div className='w-80 mr-auto ml-auto mt-24 p-16 text-center border rounded-lg bg-white border-gray-400 shadow-lg flex flex-col gap-8'>
                <div>
                    <h1 className='text-4xl font-bold pb-4'>{t('result.winner')}</h1>
                    <Mark mark={playground[result.winningMarks[0]]} size='large' />
                </div>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg h-16' onClick={() => setIsOpen(false)}>
                    {t('result.confirm')}
                </button>
            </div>
        </div>
    );
};

export default Result;
