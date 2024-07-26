import React from 'react';
import { PlayerMark } from '../../store/GameContext';

type MarkProps = {
    symbol: PlayerMark | null;
};

const Mark: React.FC<MarkProps> = ({ symbol }) => {
    if (symbol === 'x') {
        return <div className='text-red-600 font-bold text-lg'>{symbol}</div>;
    }

    if (symbol === 'o') {
        return <div className='text-blue-600 font-bold text-lg'>{symbol}</div>;
    }

    return null;
};

export default Mark;
