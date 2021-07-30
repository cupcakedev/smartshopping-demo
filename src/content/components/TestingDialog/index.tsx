/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Container } from '../styled_components';

interface IProps {
  code: string;
  current: number;
  totalAmount: number;
}

const TestingDialog = ({ code, current, totalAmount }: IProps) => (
  <Container></Container>
);

export { TestingDialog };
