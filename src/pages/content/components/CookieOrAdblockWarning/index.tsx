import React from 'react';
import { AdblockAndCookieOutput } from 'smartshopping-sdk';

import logo from '@assets/images/smartshoppingLogo.png';
import {
    ModalRoot,
    GlobalStyle,
    SmartShoppingLogo,
} from '@content/components/Demo/styles';

import { Container, Text, PrimiaryText, Button } from './styles';

interface IProps {
    coockieAndAdblockState: AdblockAndCookieOutput;
    onModalClose: () => void;
}

export const CookieOrAdblockWarning: React.FC<IProps> = ({
    coockieAndAdblockState,
    onModalClose,
}) => (
    <ModalRoot visible>
        <GlobalStyle />
        <Container>
            <SmartShoppingLogo src={logo} />
            <Text>
                It looks like you{' '}
                {!coockieAndAdblockState.isCookieEnabled && (
                    <>
                        not accept all cookies
                        {!coockieAndAdblockState.isAdblockDisabled && (
                            <> and </>
                        )}
                    </>
                )}
                {!coockieAndAdblockState.isAdblockDisabled && (
                    <>using ad blockers</>
                )}
                . For the extension to work correctly,{' '}
                {!coockieAndAdblockState.isCookieEnabled && (
                    <>
                        <PrimiaryText>confirm the use of cookies</PrimiaryText>
                        {!coockieAndAdblockState.isAdblockDisabled && (
                            <> and </>
                        )}
                    </>
                )}
                {!coockieAndAdblockState.isAdblockDisabled && (
                    <PrimiaryText>turn off all ad blockers</PrimiaryText>
                )}
                .
            </Text>
            <Button onClick={onModalClose}>OK</Button>
        </Container>
    </ModalRoot>
);
