import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createContext, PropsWithChildren } from 'react';
import { DEFAULT_PLAYER, DEFAULT_PLAYGROUND_SIZE } from '../utils/commonConstatns';
import { Result, score } from '../utils/score';
import { ErrorCode } from '../utils/errors';
import { play } from '../utils/computerPlayer';

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
    /** Change default player */
    setDefaultPlayer: React.Dispatch<React.SetStateAction<PlayerMark>>;
    /** Default player */
    defaultPlayer: PlayerMark;
    /** Game is in progress */
    gameInProgress: boolean;
};

const generatePlayground = (dimension: number): NullablePlayerMark[] => {
    return new Array<NullablePlayerMark>(dimension * dimension * dimension).fill(null);
};

export const GameContext = createContext<GameContextValue>({} as GameContextValue);

export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [playground, setPlayground] = useState<NullablePlayerMark[]>(generatePlayground(DEFAULT_PLAYGROUND_SIZE));
    const [defaultPlayer, setDefaultPlayer] = useState<PlayerMark>(DEFAULT_PLAYER);
    const [activePlayer, setActivePlayer] = useState<PlayerMark>(defaultPlayer);
    const [result, setResult] = useState<Result>();
    const playgroundSize = Math.cbrt(playground.length);
    const gameInProgress = playground.some((cell) => cell !== null);

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
            setDefaultPlayer(DEFAULT_PLAYER);
        },
        [playgroundSize]
    );

    useEffect(() => {
        setActivePlayer(defaultPlayer);
    }, [defaultPlayer, resetPlayground]);

    useEffect(() => {
        const winner = score(playground, playgroundSize);
        if (winner) {
            setResult(winner);
        } else if (activePlayer === 'o') {
            const res = play(playground, playgroundSize, 'o');
            if (res === null) {
                console.log('No strategy found');
            } else {
                markMove(res);
            }
        }
    }, [activePlayer, markMove, playground, playgroundSize]);

    const context: GameContextValue = useMemo(
        () => ({
            playground,
            playgroundSize,
            activePlayer,
            markMove,
            resetPlayground,
            result,
            setDefaultPlayer,
            defaultPlayer,
            gameInProgress
        }),
        [activePlayer, defaultPlayer, gameInProgress, markMove, playground, playgroundSize, resetPlayground, result]
    );

    return <GameContext.Provider value={context}>{children}</GameContext.Provider>;
};
