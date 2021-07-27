import styled from 'styled-components';
import { COLORS, MAIN_FONT_BOLD } from '../../constants';

const Container = styled.div`
  transform: scale(0.7, 0.7);
  position: relative;
  height: 100%;
  width: 100%;
  max-height: 500px;
  max-width: 994px;
  box-shadow: 0 3px 33px 0 rgba(0, 0, 0, 0.53);
  border-radius: 15px;
  display: flex;
  overflow: hidden;
  background: white;
`;

const Logo = styled.div`
  flex: 0 0 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:after {
    content: '';
    height: 140%;
    width: 100%;
    position: absolute;
    right: 0;
    top: -20%;
    background-image: linear-gradient(330deg, #f6b205 20%, #e67300 80%);
    border-radius: 0 50% 50% 0;
  }

  img {
    z-index: 20;
  }
`;

const Info = styled.div`
  flex: 1;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${MAIN_FONT_BOLD};

  h1 {
    color: ${COLORS.ORANGE};
    font-size: 40px;
    font-weight: bold;
    text-transform: uppercase;
  }

  h4 {
    font-size: 28px;
    font-weight: bold;
    color: #585858;
    display: flex;
    align-items: center;

    .coupons-amount {
      font-size: 40px;
      color: ${COLORS.ORANGE};
      margin-right: 8px;
    }
  }

  img {
    width: 370px;
    height: 267px;
    z-index: 20;
  }

  & button {
    width: 294px !important;
    height: 54px !important;
    border-radius: 64px;
    background: ${COLORS.BLUE};
    border: none;
    color: white;
    font-size: 22px;
    font-weight: bold;
    text-transform: capitalize;
    cursor: pointer;
    outline: none;
  }
`;

export { Container, Logo, Info };
