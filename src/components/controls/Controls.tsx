import React, { useCallback, useContext, useId, useState } from 'react';
import { GameContext } from '../../store/GameContext';
import Mark from '../playground/Mark';
import { MAX_PLAYGROUND_SIZE, MIN_PLAYGROUND_SIZE } from '../../utils/commonConstatns';
import { useTranslation } from 'react-i18next';
import { ArrowPathIcon, Bars3Icon, PlayIcon } from '@heroicons/react/24/outline';
import useSmBreakPoint from '../../hooks/useSmBreakPoint';

const Controls: React.FC = () => {
    const { playgroundSize, activePlayer, resetPlayground, defaultPlayer, setDefaultPlayer, setGameInProgress, gameInProgress, isWorking } =
        useContext(GameContext);
    const id = useId();
    const {
        t,
        i18n: {
            language,
            changeLanguage,
            options: { resources }
        }
    } = useTranslation();
    const isSmall = useSmBreakPoint();
    const [isMenuVisible, setIsMenuVisible] = useState(true);

    const setNewSize = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = +e.target.value;
            if (isNaN(value)) {
                resetPlayground(MIN_PLAYGROUND_SIZE);
            } else if (value < MIN_PLAYGROUND_SIZE) {
                resetPlayground(MIN_PLAYGROUND_SIZE);
            } else if (value > MAX_PLAYGROUND_SIZE) {
                resetPlayground(MAX_PLAYGROUND_SIZE);
            } else {
                resetPlayground(value);
            }
        },
        [resetPlayground]
    );

    if (!isMenuVisible && isSmall) {
        return (
            <div className='absolute top-0 left-0 p-4'>
                <button className='sm:hidden visible'>
                    <Bars3Icon
                        className='size-8 text-gray-500 hover:text-blue-600'
                        onClick={() => setIsMenuVisible(true)}
                        title={t('openMenu')}
                    />
                </button>
            </div>
        );
    }

    return (
        <aside className='absolute top-0 left-0 bg-white z-40 sm:w-72 w-full min-h-full border-r flex flex-col text-center gap-4 p-4'>
            <button className='sm:hidden visible'>
                <Bars3Icon
                    className='size-8 text-blue-400 hover:text-blue-600'
                    onClick={() => setIsMenuVisible(false)}
                    title={t('closeMenu')}
                />
            </button>
            {!gameInProgress && (
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg h-16'
                    onClick={() => {
                        setGameInProgress(true);
                        setIsMenuVisible(false);
                    }}
                >
                    <PlayIcon className='size-5 inline-block mr-2' />
                    {t('controls.start')}
                </button>
            )}
            {gameInProgress && (
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg h-16'
                    onClick={() => resetPlayground()}
                >
                    <ArrowPathIcon className='size-5 inline-block mr-2' />
                    {t('controls.restart')}
                </button>
            )}
            <div className='border-b pb-4'>
                <label htmlFor={`playgroundSize_${id}`} className='block text-gray-700 text-sm font-bold mb-2'>
                    {t('controls.playgroundDimension', {
                        from: MIN_PLAYGROUND_SIZE,
                        to: MAX_PLAYGROUND_SIZE
                    })}
                </label>
                <select
                    id={`playgroundSize_${id}`}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg  h-16 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:bg-slate-100'
                    value={playgroundSize}
                    onChange={setNewSize}
                    disabled={gameInProgress}
                >
                    {new Array(MAX_PLAYGROUND_SIZE - MIN_PLAYGROUND_SIZE + 1).fill(null).map((i, idx) => {
                        return (
                            <option value={MIN_PLAYGROUND_SIZE + idx} key={idx}>
                                {MIN_PLAYGROUND_SIZE + idx}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className='border-b pb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>{t('controls.firstPlayer')}</label>
                <div className='flex flex-row'>
                    <div className='flex-1 flex flex-col gap-4 justify-center items-center hover:bg-slate-100 py-2 rounded-lg'>
                        <label htmlFor={`cpu_${id}`}>
                            <Mark mark='o' size='large' />
                        </label>
                        <input
                            type='radio'
                            value='o'
                            name='firstPlayer'
                            id={`cpu_${id}`}
                            checked={defaultPlayer === 'o'}
                            onChange={() => {
                                setDefaultPlayer('o');
                            }}
                            disabled={gameInProgress}
                            className='w-6 h-6 cursor-pointer disabled:cursor-default'
                        />
                    </div>
                    <div className='flex-1 flex flex-col gap-4 justify-center items-center hover:bg-slate-100 py-2 rounded-lg'>
                        <label htmlFor={`person_${id}`}>
                            <Mark mark='x' size='large' />
                        </label>
                        <input
                            type='radio'
                            value='x'
                            name='firstPlayer'
                            id={`person_${id}`}
                            checked={defaultPlayer === 'x'}
                            onChange={() => setDefaultPlayer('x')}
                            disabled={gameInProgress}
                            className='w-6 h-6 cursor-pointer disabled:cursor-default'
                        />
                    </div>
                </div>
            </div>
            <div className='flex flex-row border-b pb-4'>
                <div className='flex-1'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>{t('controls.cpu')}</label>
                    <Mark mark='o' size='large' />
                </div>
                <div className='flex-1'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>{t('controls.person')}</label>
                    <Mark mark='x' size='large' />
                </div>
            </div>
            <div>
                <label className='block text-gray-700 text-sm font-bold mb-2'>{t('controls.activePlayer')}</label>
                <Mark mark={activePlayer} size='large' />
                {isWorking && <div className='pt-2 animate-pulse'>{t('controls.working')}</div>}
            </div>
            <div className='flex-1'></div>
            <div className='border-t pt-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>{t('controls.language')}</label>
                <div className='flex flex-col'>
                    {Object.keys(resources ?? {}).map((l) => {
                        return (
                            <div className='flex-1' key={l}>
                                <label htmlFor={`lang_${l}`} className='w-32 inline-block'>
                                    {t(`controls.${l}`)}
                                </label>
                                <input
                                    type='radio'
                                    value={l}
                                    name='language'
                                    id={`lang_${l}`}
                                    checked={language === l}
                                    onChange={() => changeLanguage(l)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='border-t pt-4'>
                <a
                    href='https://github.com/tfilo/tic-tac-toe-3d'
                    tabIndex={0}
                    target='_blank'
                    rel='noreferrer'
                    aria-label={t('github')}
                    className='flex gap-2 justify-center underline'
                >
                    <svg viewBox='0 0 98 96' width='98' height='96' xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 inline-block'>
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z'
                            fill='#24292f'
                        />
                    </svg>
                    Github
                </a>
            </div>
        </aside>
    );
};

export default Controls;
