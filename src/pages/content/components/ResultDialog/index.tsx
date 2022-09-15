import React from 'react';

import { COLORS } from '@constants/theme';
import { CloseButton, MainButton } from '../styles';
import { Grid, Header, Text, Image } from './styles';
import botWithMoney from '@assets/images/botWithMoney.png';
import closeIcon from '@assets/images/closeIcon.png';

interface IProps {
    close: () => void;
    initialPrice: number;
    priceWithDeal: number;
    bestCode: string;
}

const ResultDialog = ({
    initialPrice,
    priceWithDeal,
    bestCode,
    close,
}: IProps) => (
    <>
        <Grid data-test-role="result-dialog">
            <Header>Success!</Header>
            <Image src={botWithMoney} />
            <Text style={{ gridArea: 't1' }}>
                Cart total:{' '}
                <span
                    data-test-role="result-dialog__total"
                    style={{ color: COLORS.primary }}
                >
                    {` $${priceWithDeal?.toFixed(2)}`}
                </span>
            </Text>
            <Text style={{ gridArea: 't2' }}>
                You saved:{' '}
                <span style={{ color: COLORS.primary }}>
                    {` $${(initialPrice - priceWithDeal)?.toFixed(2)}`}
                </span>
            </Text>
            <Text style={{ gridArea: 't3' }}>
                With code:{' '}
                <span style={{ color: COLORS.primary }}>{bestCode}</span>
            </Text>
            <MainButton
                data-test-role="result-dialog__start-button"
                onClick={close}
                style={{ gridArea: 'b' }}
            >
                Continue to checkout
            </MainButton>
        </Grid>
        <CloseButton
            data-test-role="result-dialog__close-button"
            onClick={close}
            src={closeIcon}
        />
    </>
);

export { ResultDialog };
