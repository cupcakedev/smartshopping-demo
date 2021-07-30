/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Container } from '../styled_components';

interface IProps {
  close: () => void;
}

const NoDealsDialog = ({ close }: IProps) => <Container></Container>;

export { NoDealsDialog };
