import React from 'react';

import { COLORS } from 'src/constants/constants';
import { CloseButton, MainButton } from '../styled_components';
import { Grid, Text, Header, Image } from './styles';
import closeIcon from '../../../../assets/images/closeIcon.png';
import botWithMoney from '../../../../assets/images/botWithMoney.png';

interface IProps {
    close: () => void;
}

const NoDealsDialog = ({ close }: IProps) => (
    <Grid data-test-role="no-deals-dialog">
        <CloseButton
            data-test-role="no-deals-dialog__close-button"
            onClick={close}
            src={closeIcon}
        />
        <Image src={botWithMoney} />
        <Header>You already have the best deal</Header>
        <Text style={{ gridArea: 't1' }}>
            We searched high and low to make sure you got the best deal
        </Text>
        <MainButton
            data-test-role="no-deals-dialog__start-button"
            onClick={close}
            style={{ gridArea: 'b' }}
        >
            Continue to checkout
        </MainButton>
    </Grid>
);

export { NoDealsDialog };
