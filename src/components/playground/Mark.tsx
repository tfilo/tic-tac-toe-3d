import React from 'react';
import { PlayerMark } from '../../store/GameContext';

type MarkProps = {
    mark: PlayerMark | null;
    size?: 'normal' | 'large';
};

const Mark: React.FC<MarkProps> = ({ mark, size = 'normal' }) => {
    if (mark === 'x') {
        return <div className={`text-red-600 font-bold ${size === 'large' ? 'text-5xl' : 'text-2xl'}`}>{mark}</div>;
    }

    if (mark === 'o') {
        return <div className={`text-blue-600 font-bold ${size === 'large' ? 'text-5xl' : 'text-2xl'}`}>{mark}</div>;
    }

    return null;
};

export default Mark;
