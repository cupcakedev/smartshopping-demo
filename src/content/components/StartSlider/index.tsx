import React, { useState } from 'react';

import { COLORS } from '../constants';
import { Grid, Header, Text, Start, Close } from './styles';

interface IProps {
  close: () => void;
  start: () => void;
  promocodes: number;
  total: number;
  shop: string;
}

const StartSlider = ({ promocodes, total, shop, close, start }: IProps) => {
  const [fade, setFade] = useState<'in' | 'out'>('in');
  const fadeout = async () => {
    setFade('out');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    close();
  };
  return (
    <Grid fade={fade}>
      <Header>Smart Shopping</Header>
      <Text>
        Checkout page of:{' '}
        <span style={{ color: COLORS.secondary }}>{shop}</span>
      </Text>
      <Text>
        Coupons found:{' '}
        <span style={{ color: COLORS.secondary }}>{promocodes}</span>
      </Text>
      <Text>
        Cart total: <span style={{ color: COLORS.secondary }}>{total}</span>
      </Text>
      <Start onClick={start}>START</Start>
      <Close onClick={fadeout}>x</Close>
    </Grid>
  );
};

export { StartSlider };
