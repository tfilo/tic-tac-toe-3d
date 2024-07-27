import React from 'react';
import { PlayerMark } from '../../store/GameContext';

type MarkProps = {
    symbol: PlayerMark | null;
};

const Mark: React.FC<MarkProps> = ({ symbol }) => {
    if (symbol === 'x') {
        return <div className='text-red-600 font-bold text-2xl'>{symbol}</div>;
    }

    if (symbol === 'o') {
        return <div className='text-blue-600 font-bold text-2xl'>{symbol}</div>;
    }

    return null;
};

export default Mark;
