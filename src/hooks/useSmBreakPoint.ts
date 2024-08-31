import { useSyncExternalStore } from 'react';

const useSmBreakPoint = (): boolean => {
    return useSyncExternalStore(subscribe, getSnapshot.bind(this));
};

function subscribe(onStoreChange: () => void) {
    window.addEventListener('resize', onStoreChange);
    return () => window.removeEventListener('resize', onStoreChange);
}

function getSnapshot() {
    const w = window.innerWidth;
    return w < 640;
}

export default useSmBreakPoint;
