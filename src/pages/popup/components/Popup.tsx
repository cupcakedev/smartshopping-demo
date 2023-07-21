import React, { useCallback } from 'react';
import { Container, Button } from './styles';
import { useChromeStorage } from '@hooks/useChromeStorage';
import { LocalStorageKeys } from 'src/storage/config';

export const Popup = () => {
    const [isDevMod, setIsDevMod] = useChromeStorage(
        LocalStorageKeys.isDevMod,
        false
    );
    const [checkOnCoockieAndAdblock, setCheckOnCookieAndAdblock] =
        useChromeStorage(LocalStorageKeys.checkOnCookieAndAdblock, false);

    const toggleHandlerDevMode = useCallback(
        () => setIsDevMod((pState) => !pState),
        [setIsDevMod]
    );

    const toggleHandlerCheckOnCookieAndAdblock = useCallback(
        () => setCheckOnCookieAndAdblock((pState) => !pState),
        [setCheckOnCookieAndAdblock]
    );

    return (
        <Container>
            <Button enabled={isDevMod} onClick={toggleHandlerDevMode}>
                Dev mode
            </Button>
            <Button
                enabled={checkOnCoockieAndAdblock}
                onClick={toggleHandlerCheckOnCookieAndAdblock}
            >
                Check on cookie and adblock
            </Button>
        </Container>
    );
};
