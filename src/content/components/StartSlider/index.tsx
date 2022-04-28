import React, { useState } from 'react';

import { COLORS } from '../../../constants';
import headBot from '../../assets/headBot.png';
import closeIcon from '../../assets/closeIcon.png';
import { Grid, Header, Text, Start, Close, Image, CloseIcon, Detect } from './styles';

interface IProps {
  inspectOnly: boolean;
  close: () => void;
  start: () => void;
  promocodes: number;
  total: number;
  shop: string;
  activateDetect: () => void;
  isDetectButtonVisible: boolean;
}

const StartSlider = ({
  inspectOnly,
  promocodes,
  total,
  shop,
  close,
  start,
  activateDetect,
  isDetectButtonVisible
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
        Brand: <span style={{ color: COLORS.primary }}>{shop}</span>
      </Text>
      <Text>
        Coupons: <span style={{ color: COLORS.primary }}>{promocodes}</span>
      </Text>
      <Text>
        Cart total:{' '}
        <span
          data-test-role="start-slider__total"
          style={{ color: COLORS.primary }}
        >
          {' $' + total?.toFixed(2)}
        </span>
      </Text>
      <Start
        data-test-role="start-slider__start-button"
        onClick={inspectOnly ? fadeout : start}
      >
        {inspectOnly ? 'Close' : 'Start'}
      </Start>
      {isDetectButtonVisible && (
        <Detect
          data-test-role="start-slider__detect-button"
          onClick={activateDetect}
        >
          Detect
        </Detect>
      )}
      <Close data-test-role="start-slider__close-button" onClick={fadeout}>
        <CloseIcon src={closeIcon} />
      </Close>
    </Grid>
  );
};

export { StartSlider };
