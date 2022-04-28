import React from 'react';

import { COLORS } from 'src/constants';
import couponIcon from '../../assets/couponIcon.png';
import { Grid, ProgressBar, Text, CodeCell, CouponIcon } from './styles';

interface IProps {
  code: string;
  current: number;
  totalAmount: number;
}

const TestingDialog = ({ code, current, totalAmount }: IProps) => (
  <Grid data-test-role="testing-dialog">
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
