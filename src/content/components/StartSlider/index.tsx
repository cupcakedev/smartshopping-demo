import React, { useState } from 'react';

import { COLORS } from '../constants';
import headBot from '../../assets/headBot.png'
import closeIcon from '../../assets/closeIcon.png'
import { Grid, Header, Text, Start, Close, Image, CloseIcon } from './styles';

interface IProps {
  inspectOnly: boolean;
  close: () => void;
  start: () => void;
  promocodes: number;
  total: number;
  shop: string;
}

const StartSlider = ({
  inspectOnly,
  promocodes,
  total,
  shop,
  close,
  start,
}: IProps) => {
  const [fade, setFade] = useState<'in' | 'out'>('in');
  const fadeout = async () => {
    setFade('out');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    close();
  };
  return (
    <Grid fade={fade}>
      <Header>
          <Image src={headBot} />
          SmartShopping.ai
      </Header>
      <Text>
        Brand:{' '}
        <span style={{ color: COLORS.primary }}>{shop}</span>
      </Text>
      <Text>
        Coupons:{' '}
        <span style={{ color: COLORS.primary }}>{promocodes}</span>
      </Text>
      <Text>
        Cart total: <span style={{ color: COLORS.primary }}>{' $' + total.toFixed(2)}</span>
      </Text>
      <Start onClick={inspectOnly ? fadeout : start}>
        {inspectOnly ? 'Close' : 'Start'}
      </Start>
      <Close onClick={fadeout}>
          <CloseIcon src={closeIcon} />
      </Close>
    </Grid>
  );
};

export { StartSlider };
