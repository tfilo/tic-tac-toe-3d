import React, { useCallback, useContext, useId } from 'react';
import { GameContext } from '../../store/GameContext';
import Mark from '../playground/Mark';
import { MAX_PLAYGROUND_SIZE, MIN_PLAYGROUND_SIZE } from '../../utils/commonConstatns';

const Controls: React.FC = () => {
    const { playgroundSize, activePlayer, resetPlayground } = useContext(GameContext);
    const id = useId();

    const setNewSize = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
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

    return (
        <aside className='absolute top-0 left-0 w-72 h-full border-r flex flex-col text-center gap-4 p-4'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={(e) => resetPlayground()}>
                New game
            </button>
            <div>
                <label htmlFor={`playgroundSize_${id}`} className='block text-gray-700 text-sm font-bold mb-2'>
                    Playground dimension
                </label>
                <input
                    id={`playgroundSize_${id}`}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    type='number'
                    step={1}
                    min={3}
                    max={6}
                    value={playgroundSize}
                    onChange={setNewSize}
                />
            </div>
            <div>
                <label htmlFor={`activePlayer_${id}`} className='block text-gray-700 text-sm font-bold mb-2'>
                    Active player
                </label>
                <div id={`activePlayer_${id}`}>
                    <Mark mark={activePlayer} />
                </div>
            </div>
        </aside>
    );
};

export default Controls;
