import React from 'react';

import { COLORS } from 'src/constants';
import couponIcon from '../../assets/couponIcon.png';
import closeIcon from '../../assets/closeIcon.png';
import { CloseButton } from '../styled_components';
import { Grid, ProgressBar, Text, CodeCell, CouponIcon } from './styles';

interface IProps {
  code: string;
  current: number;
  totalAmount: number;
  close: () => void;
}

const TestingDialog = ({ code, current, totalAmount, close }: IProps) => (
  <Grid data-test-role="testing-dialog">
    <CloseButton
      data-test-role="start-dialog__close-button"
      onClick={close}
      src={closeIcon}
    />
    <ProgressBar value={current} max={totalAmount}></ProgressBar>
    <Text
      style={{
        gridArea: 'count',
        fontSize: 24,
        color: COLORS.primary,
        marginLeft: '12px',
      }}
    >
      {current}/{totalAmount}
    </Text>
    <Text>
      Testing code
      <CodeCell>
        <CouponIcon src={couponIcon} />
        {code}
      </CodeCell>
    </Text>
  </Grid>
);

export { TestingDialog };
