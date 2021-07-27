/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import coin from '../../assets/coin_dancing.gif';
import dollar from '../../assets/dollar_dancing.gif';
import logo from '../../assets/cupcake_logo.png';
import { Container, Logo, Info } from './styles';

interface IProps {
  code: string;
  current: number;
  totalAmount: number;
}

const TestingDialog = ({ code, current, totalAmount }: IProps) => (
  <Container>
    <Logo>
      <img src={logo} alt="" />
    </Logo>
    <Info>
      <div>
        <img src={dollar} alt="dollar" />
      </div>
      <div className="aa-testing-process">
        <h1>testing codes...</h1>
        <h4>
          Coupon {code} ({current} 0f {totalAmount})
        </h4>
        <div className="aa-progress-bar">
          <span style={{ width: `${(100 / totalAmount) * current}%` }} />
        </div>
      </div>
      <div>
        <img src={coin} alt="coin" />
      </div>
    </Info>
  </Container>
);

export { TestingDialog };
