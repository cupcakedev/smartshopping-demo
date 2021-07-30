import React from 'react';
import { Container } from '../styled_components';

interface IProps {
  close: () => void;
  initialPrice: number;
  priceWithDeal: number;
}

const ResultDialog = ({ initialPrice, priceWithDeal, close }: IProps) => (
  <Container></Container>
);

export { ResultDialog };
