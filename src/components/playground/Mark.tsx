import React from 'react';
import { PlayerMark } from '../../store/GameContext';

type MarkProps = {
    mark: PlayerMark | null;
};

const Mark: React.FC<MarkProps> = ({ mark }) => {
    if (mark === 'x') {
        return <div className='text-red-600 font-bold text-2xl'>{mark}</div>;
    }

    if (mark === 'o') {
        return <div className='text-blue-600 font-bold text-2xl'>{mark}</div>;
    }

    return null;
};

export default Mark;
