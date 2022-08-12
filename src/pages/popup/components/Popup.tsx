import React, { useCallback, useEffect, useState } from 'react';
import { Container, Button } from './styled_components';
import { useChromeStorage } from 'src/hooks/useChromeStorage';
import { LocalStorageKeys } from 'src/storage/config';

export const Popup = () => {
    const [isDevMod, setIsDevMod] = useChromeStorage(
        LocalStorageKeys.isDevMod,
        false
    );

    const toggleHandler = useCallback(
        () => setIsDevMod((pState) => !pState),
        [setIsDevMod]
    );

    return (
        <Container>
            <Button enabled={isDevMod} onClick={toggleHandler}>
                Dev mode
            </Button>
        </Container>
    );
};
