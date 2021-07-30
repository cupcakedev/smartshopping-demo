import React from 'react';
import { Container } from '../styled_components';

interface IProps {
  totalAmount: number;
  close: () => void;
  start: () => void;
}

const StartDialog = ({ totalAmount, close, start }: IProps) => (
  <Container></Container>
);

export { StartDialog };
