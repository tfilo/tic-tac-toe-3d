import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createContext, PropsWithChildren } from 'react';

export type PlayerMark = 'x' | 'o';

type GameContextValue = {
    playgroundSize: number;
    setPlaygroundSize: React.Dispatch<React.SetStateAction<number>>;
    playground: (PlayerMark | null)[][][];
    mark: (coordinates: { level: number; row: number; col: number }) => void;
    activePlayer: PlayerMark;
    reset: () => void;
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

const DEFAULT_SIZE = 4 as const;
const DEFAULT_PLAYER = 'x' as const;

const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [playgroundSize, setPlaygroundSize] = useState<number>(DEFAULT_SIZE);
    const [playground, setPlayground] = useState<(PlayerMark | null)[][][]>(generatePlayground(playgroundSize));
    const [activePlayer, setActivePlayer] = useState<PlayerMark>(DEFAULT_PLAYER);

    const mark = useCallback(
        (coordinates: { level: number; row: number; col: number }) => {
            if (playground.length !== playgroundSize) {
                throw new Error("Playground dimensions doesn't match value of playgroundSize variable!");
            }
            try {
                setPlayground((prev) => {
                    if (prev[coordinates.level][coordinates.row][coordinates.col] !== null) {
                        throw new Error('Cell already used!');
                    }
                    const result = structuredClone(prev);
                    result[coordinates.level][coordinates.row][coordinates.col] = activePlayer;
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
                throw new Error("Playground size doesn't match playgroundSize");
            }
        },
        [activePlayer, playground.length, playgroundSize]
    );

    console.log(playground);

    const reset = useCallback(() => {
        setPlayground(generatePlayground(playgroundSize));
        setActivePlayer(DEFAULT_PLAYER);
    }, [playgroundSize]);

    useEffect(() => {
        setPlayground(generatePlayground(playgroundSize));
    }, [playgroundSize]);

    const context: GameContextValue = useMemo(
        () => ({
            playgroundSize,
            setPlaygroundSize,
            playground,
            mark,
            activePlayer,
            reset
        }),
        [activePlayer, mark, playground, playgroundSize, reset]
    );

    return <GameContext.Provider value={context}>{children}</GameContext.Provider>;
};

export default GameProvider;
