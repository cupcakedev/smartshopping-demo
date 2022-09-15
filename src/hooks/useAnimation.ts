import { useCallback, useState } from 'react';
import { sleep } from '@utils/commonUtils';

export const useAnimation = <T>(
    defaultPhase: T,
    duration: number,
    delay: number = 0
) => {
    const [phase, setPhase] = useState<T>(defaultPhase);

    const startAnimation = useCallback(
        (nPhase: T, cb?: () => void) => async () => {
            if (delay) await sleep(delay);
            setPhase(nPhase);
            if (duration) await sleep(duration);
            if (cb) cb();
        },
        []
    );

    return {
        phase,
        startAnimation,
    };
};
