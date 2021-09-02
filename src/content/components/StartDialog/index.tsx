import React from 'react';

import { COLORS } from '../constants';
import botWithCoupon from '../../assets/botWithCoupon.png';
import closeIcon from '../../assets/closeIcon.png';

import { CloseButton, MainButton } from '../styled_components';
import { Grid, Image, Text } from './styles';

interface IProps {
  totalAmount: number;
  close: () => void;
  start: () => void;
}

const StartDialog = ({ totalAmount, close, start }: IProps) => (
  <>
    <CloseButton
      data-test-role="start-dialog__close-button"
      onClick={close}
      src={closeIcon}
    />
    <Grid>
      <Image src={botWithCoupon} />
      <Text
        style={{
          gridArea: 't1',
          alignSelf: 'center',
          fontSize: 24,
          color: COLORS.primary,
          fontWeight: 'bold',
        }}
      >
        {totalAmount + ' '}
        coupons found
      </Text>
      <Text style={{ gridArea: 't2' }}>
        We searched high and low to make sure you get the best coupons
      </Text>
      <MainButton data-test-role="start-dialog__start-button" onClick={start}>
        Apply coupons
      </MainButton>
    </Grid>
  </>
);

export { StartDialog };
