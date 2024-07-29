import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createContext, PropsWithChildren } from 'react';
import { DEFAULT_PLAYER, DEFAULT_PLAYGROUND_SIZE } from '../utils/commonConstatns';
import { Result, score } from '../utils/score';
import { ErrorCode } from '../utils/errors';

export type PlayerMark = 'x' | 'o';
export type NullablePlayerMark = PlayerMark | null;

type GameContextValue = {
    /** Size of single side of cube playground */
    readonly playgroundSize: number;
    /** Playground array with marked all moves */
    readonly playground: NullablePlayerMark[];
    /** Current user on the move */
    readonly activePlayer: PlayerMark;
    /** Marks move for current user and change to next user */
    markMove: (index: number) => void;
    /** Resets playground, optionaly change to different size */
    resetPlayground: (newSize?: number) => void;
    /** Game result with winner and winning marks coordinates */
    result: Result | undefined;
};

const generatePlayground = (dimension: number): NullablePlayerMark[] => {
    return new Array<NullablePlayerMark>(dimension * dimension * dimension).fill(null);
};

export const GameContext = createContext<GameContextValue>({} as GameContextValue);

export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [playground, setPlayground] = useState<NullablePlayerMark[]>(generatePlayground(DEFAULT_PLAYGROUND_SIZE));
    const [activePlayer, setActivePlayer] = useState<PlayerMark>(DEFAULT_PLAYER);
    const [result, setResult] = useState<Result>();
    const playgroundSize = Math.cbrt(playground.length);

    const markMove = useCallback(
        (index: number) => {
            if (playground[index] !== null) {
                throw new Error(ErrorCode.AlreadyUsed);
            }
            setPlayground((prev) => {
                const res = [...prev];
                res.splice(index, 1, activePlayer);
                return res;
            });
            setActivePlayer((prev) => {
                if (prev === 'x') {
                    return 'o';
                } else {
                    return 'x';
                }
            });
        },
        [activePlayer, playground]
    );

    const resetPlayground = useCallback(
        (newSize?: number) => {
            if (newSize && !isNaN(+newSize) && newSize >= 3 && newSize <= 6) {
                setPlayground(generatePlayground(newSize));
            } else {
                setPlayground(generatePlayground(playgroundSize));
            }
            setResult(undefined);
            setActivePlayer(DEFAULT_PLAYER);
        },
        [playgroundSize]
    );

    useEffect(() => {
        const winner = score(playground, playgroundSize);
        if (winner) {
            setResult(winner);
        }
    }, [playground, playgroundSize]);

    const context: GameContextValue = useMemo(
        () => ({
            playground,
            playgroundSize,
            activePlayer,
            markMove,
            resetPlayground,
            result
        }),
        [activePlayer, markMove, playground, playgroundSize, resetPlayground, result]
    );

    return <GameContext.Provider value={context}>{children}</GameContext.Provider>;
};
