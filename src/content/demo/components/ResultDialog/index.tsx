import React from 'react';
import highfive from '../../assets/highfive.gif';
import logo from '../../assets/cupcake_logo.png';
import { Container, Logo, Info } from './styles';

interface IProps {
  close: () => void;
  initialPrice: number;
  priceWithDeal: number;
}

const ResultDialog = ({ initialPrice, priceWithDeal, close }: IProps) => (
  <Container>
    <Logo>
      <img src={logo} alt="" />
    </Logo>
    <Info>
      <div className="result-calculations">
        <h1>complete!</h1>
        <div className="result-calculations-figures">
          <div className="result-calculations-item">
            <span className="result-calculations-title">Original</span>
            <span className="result-calculations-value">
              {initialPrice.toFixed(2)}
            </span>
          </div>
          <div className="result-calculations-item">
            <span className="result-calculations-title">
              With SmartShopping
            </span>
            <span className="result-calculations-value">
              {priceWithDeal.toFixed(2)}
            </span>
          </div>
          <div className="result-calculations-item">
            <span className="result-calculations-title">Saved</span>
            <span className="result-calculations-value profit">
              {(initialPrice - priceWithDeal).toFixed(2)}
            </span>
          </div>
        </div>
        <p className="result-aa-text">
          Click &quot;Finish&quot; to close this windows and proceed with your
          checkout.
        </p>
        <button onClick={close} type="button">
          finish
        </button>
      </div>
      <img src={highfive} alt="pic" />
    </Info>
  </Container>
);

export { ResultDialog };
