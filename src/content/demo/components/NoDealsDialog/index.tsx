/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import warningSign from '../../assets/warning_sign.svg';
import logo from '../../assets/cupcake_logo.png';
import { Container, Logo, Info } from './styles';

interface IProps {
  close: () => void;
}

const NoDealsDialog = ({ close }: IProps) => (
  <Container>
    <Logo>
      <img src={logo} alt="" />
    </Logo>
    <Info>
      <span className="btcr-exclamation-icon">
        <img src={warningSign} alt="!" />
      </span>
      <h1>no valid coupons</h1>
      <p>
        Unfortunately there is no valid coupons for current purchase.
        <br />
        No money was saved.
      </p>
      <button type="button" onClick={close}>
        close
      </button>
    </Info>
  </Container>
);

export { NoDealsDialog };
