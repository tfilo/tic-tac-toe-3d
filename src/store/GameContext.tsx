import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createContext, PropsWithChildren } from 'react';
import { DEFAULT_PLAYER, DEFAULT_PLAYGROUND_SIZE } from '../utils/commonConstatns';
import { Result, score } from '../utils/score';

export type PlayerMark = 'x' | 'o';

type GameContextValue = {
    /** Size of single side of cube playground */
    readonly playgroundSize: number;
    /** Playground array with marked all moves */
    readonly playground: (PlayerMark | null)[][][];
    /** Current user on the move */
    readonly activePlayer: PlayerMark;
    /** Marks move for current user and change to next user */
    markMove: (coordinates: { level: number; row: number; column: number }) => void;
    /** Resets playground, optionaly change to different size */
    resetPlayground: (newSize?: number) => void;
    /** Game result with winner and winning marks coordinates */
    result: Result | undefined;
};

const generatePlayground = (dimension: number) => {
    const result: (PlayerMark | null)[][][] = [];
    for (let level = 0; level < dimension; level++) {
        const level: (PlayerMark | null)[][] = [];
        for (let row = 0; row < dimension; row++) {
            const row: (PlayerMark | null)[] = [];
            for (let col = 0; col < dimension; col++) {
                row.push(null);
            }
            level.push(row);
        }
        result.push(level);
    }
    return result;
};

export const GameContext = createContext<GameContextValue>({} as GameContextValue);

export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [playground, setPlayground] = useState<(PlayerMark | null)[][][]>(generatePlayground(DEFAULT_PLAYGROUND_SIZE));
    const [activePlayer, setActivePlayer] = useState<PlayerMark>(DEFAULT_PLAYER);
    const [result, setResult] = useState<Result>();
    const playgroundSize = playground.length;

    const markMove = useCallback(
        (coordinates: { level: number; row: number; column: number }) => {
            try {
                setPlayground((prev) => {
                    if (prev[coordinates.level][coordinates.row][coordinates.column] !== null) {
                        throw new Error('Cell already used!');
                    }
                    const result = structuredClone(prev);
                    result[coordinates.level][coordinates.row][coordinates.column] = activePlayer;
                    return result;
                });
                setActivePlayer((prev) => {
                    if (prev === 'x') {
                        return 'o';
                    } else {
                        return 'x';
                    }
                });
            } catch (e) {
                throw new Error('An error occured while making move!');
            }
        },
        [activePlayer]
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
        const winner = score(playground);
        if (winner) {
            setResult(winner);
        }
    }, [playground]);

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
