import React from 'react';
import {
  SmallContainer,
  Header,
  Text,
  ApplyButton,
  CloseButton,
} from './styles';

interface IProps {
  close: () => void;
  start: () => void;
  promocodes: Array<string>;
  total: number;
  shop: string;
}

const StartSlider = ({ promocodes, total, shop, close, start }: IProps) => (
  <SmallContainer>
    <Header>SmartShopping.ai info:</Header>
    <Text>Checkout page of: {shop}</Text>
    <Text>Coupons found: {promocodes.join(', ')}</Text>
    <Text>Cart total: {total}</Text>
    <ApplyButton onClick={start}>Try CAA</ApplyButton>
    <CloseButton onClick={close}>x</CloseButton>
  </SmallContainer>
);

export { StartSlider };
