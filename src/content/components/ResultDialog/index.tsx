import React from 'react';

import { COLORS } from '../constants';
import { CloseButton, MainButton } from '../styled_components';
import { Grid, Header, Text, Image } from './styles';
import botWithMoney from '../../assets/botWithMoney.png'
import closeIcon from '../../assets/closeIcon.png'

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
    <Grid>
      <Header>Success!</Header>
      <Image src={botWithMoney} />
      <Text style={{ gridArea: 't1' }}>
        Cart total:{' '}
        <span style={{ color: COLORS.primary }}>{' $' + priceWithDeal}</span>
      </Text>
      <Text style={{ gridArea: 't2' }}>
        You saved:{' '}
        <span style={{ color: COLORS.primary }}>{' $' + (initialPrice - priceWithDeal)}</span>
      </Text>
      <Text style={{ gridArea: 't3' }}>
        With code:{' '} <span style={{ color: COLORS.primary }}>{bestCode}</span>
      </Text>
      <MainButton onClick={close} style={{ gridArea: 'b' }}>Continue to checkout</MainButton>
    </Grid>
    <CloseButton onClick={close} src={closeIcon} />
  </>
);

export { ResultDialog };
