import React from 'react';

import { COLORS } from '../constants';
import { CloseButton, MainButton } from '../styled_components';
import { Grid, Header, Text, Image } from './styles';
import smartPeople from '../../assets/smartPeople.png';

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
      <Image src={smartPeople} />
      <Text style={{ gridArea: 't1' }}>
        Code <span style={{ color: COLORS.primary }}>{bestCode}</span>{' '}
        succesfully applied
      </Text>
      <Text style={{ gridArea: 't2' }}>
        Initial price:{' '}
        <span style={{ color: COLORS.secondary }}>{initialPrice}</span>
      </Text>
      <Text style={{ gridArea: 't3' }}>
        Current price:{' '}
        <span style={{ color: COLORS.secondary }}>{priceWithDeal}</span>
      </Text>
      <MainButton onClick={close} style={{ gridArea: 'b', width: 400 }}>RETURN TO CHECKOUT</MainButton>
    </Grid>
    <CloseButton onClick={close}>x</CloseButton>
  </>
);

export { ResultDialog };
