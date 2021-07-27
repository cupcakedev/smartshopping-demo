import React from 'react';
import jumping from '../../assets/jumping.gif';
import logo from '../../assets/cupcake_logo.png';
import { CloseButton } from '../shared_styles/styles';
import { Container, Logo, Info } from './styles';

interface IProps {
  totalAmount: number;
  close: () => void;
  start: () => void;
}

const StartDialog = ({ totalAmount, close, start }: IProps) => (
  <Container>
    <Logo>
      <img src={logo} alt="" />
    </Logo>
    <Info>
      <h1 style={{ marginBottom: 20 }}>coupons found</h1>
      <h4>
        <span className="coupons-amount">{totalAmount}</span>
        coupon codes
      </h4>
      <img src={jumping} alt="pic" />
      <button type="button" onClick={start}>
        save money
      </button>
    </Info>
    <CloseButton onClick={close} />
  </Container>
);

export { StartDialog };
