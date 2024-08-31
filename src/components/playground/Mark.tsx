import React from 'react';
import { PlayerMark } from '../../store/GameContext';
import x from '../../assets/x.png';
import o from '../../assets/o.png';

type MarkProps = {
    mark: PlayerMark | null;
    size?: 'normal' | 'large';
};

const Mark: React.FC<MarkProps> = ({ mark, size = 'normal' }) => {
    if (mark === 'x') {
        return <img src={x} alt={'x'} className={size === 'large' ? 'w-8 h-8 mx-auto' : 'w-5 h-5 mx-auto'} />;
    }

    if (mark === 'o') {
        return <img src={o} alt={'o'} className={size === 'large' ? 'w-8 h-8 mx-auto' : 'w-5 h-5 mx-auto'} />;
    }

    return null;
};

export default Mark;
