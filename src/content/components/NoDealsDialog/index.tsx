import React from 'react';

import { COLORS } from 'src/content/components/constants';
import { CloseButton, MainButton } from '../styled_components';
import { Grid, Text } from './styles';

interface IProps {
  close: () => void;
}

const NoDealsDialog = ({ close }: IProps) => (
  <Grid>
    <CloseButton onClick={close}>x</CloseButton>
    <Text style={{ gridArea: 't1' }}>Sadly, all the codes failed...</Text>
    <MainButton onClick={close} style={{ gridArea: 'b' }}>
      CHECKOUT
    </MainButton>
    <Text style={{ gridArea: 't2', fontSize: 28 }}>
      and get the <span style={{ color: COLORS.secondary }}>cashback</span>
    </Text>
  </Grid>
);

export { NoDealsDialog };
