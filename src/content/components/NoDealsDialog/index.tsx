/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import { CloseButton } from '../styled_components';
import { Grid } from './styles';

interface IProps {
  close: () => void;
}

const NoDealsDialog = ({ close }: IProps) => (
  <Grid>
    <CloseButton onClick={close}>x</CloseButton>
  </Grid>
);

export { NoDealsDialog };
