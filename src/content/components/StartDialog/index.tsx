import React from 'react';

import { COLORS } from '../constants';
import smartbot from '../../assets/smartbot.png';

import { CloseButton } from '../styled_components';
import { Grid, Image, StartButton, Text } from './styles';

interface IProps {
  totalAmount: number;
  close: () => void;
  start: () => void;
}

const StartDialog = ({ totalAmount, close, start }: IProps) => (
  <>
    <CloseButton onClick={close}>x</CloseButton>
    <Grid>
      <Image src={smartbot} />
      <Text style={{ gridArea: 't1', alignSelf: 'start', fontSize: 40 }}>
        We found{' '}
        <span
          style={{ color: COLORS.secondary, fontWeight: 'bold', fontSize: 40 }}
        >
          {totalAmount}
        </span>{' '}
        coupons!
      </Text>
      <Text style={{ gridArea: 't2' }}>Let us try to</Text>
      <StartButton onClick={start}>APPLY CODES</StartButton>
      <Text style={{ gridArea: 't3' }}> and get the best deal for you</Text>
    </Grid>
  </>
);

export { StartDialog };
