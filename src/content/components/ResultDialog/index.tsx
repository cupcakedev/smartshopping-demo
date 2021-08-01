import React from 'react';

import { CloseButton } from '../styled_components';
import { Grid } from './styles';

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
  <Grid>
    <CloseButton onClick={close}>x</CloseButton>
  </Grid>
);

export { ResultDialog };
