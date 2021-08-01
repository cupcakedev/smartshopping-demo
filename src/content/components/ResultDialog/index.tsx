import React from 'react';

import { CloseButton } from '../styled_components';
import { Grid } from './styles';

interface IProps {
  close: () => void;
  initialPrice: number;
  priceWithDeal: number;
}

const ResultDialog = ({ initialPrice, priceWithDeal, close }: IProps) => (
  <Grid>
    <CloseButton onClick={close}>x</CloseButton>
  </Grid>
);

export { ResultDialog };
