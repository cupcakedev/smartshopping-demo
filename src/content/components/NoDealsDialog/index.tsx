import React from 'react';

import { COLORS } from 'src/content/components/constants';
import { CloseButton, MainButton } from '../styled_components';
import { Grid, Text, Header, Image } from './styles';
import closeIcon from '../../assets/closeIcon.png'
import botWithMoney from "../../assets/botWithMoney.png";

interface IProps {
  close: () => void;
}

const NoDealsDialog = ({ close }: IProps) => (
  <Grid>
    <CloseButton onClick={close} src={closeIcon} />
    <Image src={botWithMoney} />
    <Header>You already have the best deal</Header>
    <Text style={{ gridArea: 't1' }}>We searched high and low
        to make sure you got the best deal
    </Text>
    <MainButton onClick={close} style={{ gridArea: 'b' }}>
      Continue to checkout
    </MainButton>
  </Grid>
);

export { NoDealsDialog };
