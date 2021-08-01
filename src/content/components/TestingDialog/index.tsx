import React from 'react';

import { COLORS } from 'src/content/components/constants';
import { Grid, ProgressBar, Text, Cog } from './styles';

import cog from '../../assets/cog.png';

interface IProps {
  code: string;
  current: number;
  totalAmount: number;
}

const TestingDialog = ({ code, current, totalAmount }: IProps) => (
  <Grid>
    <Text style={{ gridArea: 'title', color: COLORS.grey }}>Testing codes...</Text>
    <Text style={{ gridArea: 'code'}}>{code}</Text>
    <Cog src={cog} side={'left'} style={{ gridArea: 'cog-l' }} />
    <ProgressBar value={current} max={totalAmount}></ProgressBar>
    <Cog src={cog} side={'right'} style={{ gridArea: 'cog-r' }} />
    <Text
      style={{
        gridArea: 'count',
        letterSpacing: '0.2em',
        fontSize: 32,
      }}
    >
      [{current}/{totalAmount}]
    </Text>
  </Grid>
);

export { TestingDialog };
