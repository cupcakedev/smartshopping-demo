import React from 'react';

import { Grid } from './styles';

interface IProps {
  code: string;
  current: number;
  totalAmount: number;
}

const TestingDialog = ({ code, current, totalAmount }: IProps) => <Grid></Grid>;

export { TestingDialog };
