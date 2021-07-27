import styled from 'styled-components';
import { COLORS, MAIN_FONT_BOLD } from '../../constants';

const Container = styled.div`
  transform: scale(0.7, 0.7);
  height: 100%;
  width: 100%;
  max-height: 500px;
  max-width: 994px;
  box-shadow: 0 3px 33px 0 rgba(0, 0, 0, 0.53);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
`;

const Logo = styled.div`
  flex: 0 0 157px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:after {
    content: '';
    height: 100%;
    width: 110%;
    position: absolute;
    right: -5%;
    background-image: linear-gradient(284deg, #e67300 20%, #f6b205 80%);
    border-radius: 0 0 50% 50%;
  }

  img {
    width: 360px;
    height: 80px;
    z-index: 20;
  }
`;

const Info = styled.div`
  flex: 1;
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: ${MAIN_FONT_BOLD};

  h1 {
    color: ${COLORS.ORANGE};
    font-size: 40px;
    font-weight: bold;
    text-transform: uppercase;
  }

  h4 {
    font-size: 24px;
    font-weight: bold;
    color: #585858;
    display: flex;
    align-items: center;
    margin: 10px 0 30px 0;

    .coupons-amount {
      font-size: 40px;
      color: ${COLORS.ORANGE};
      margin-right: 8px;
    }
  }

  .aa-testing-process {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .aa-progress-bar {
    width: 358px;
    height: 13px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;

    span {
      position: absolute;
      background-image: linear-gradient(101deg, #f6b205, #e67300);
      height: 100%;
      width: 0%;
      transition: width 0.5s ease;
    }
  }

  img {
    width: 286px;
    height: 254px;
  }

  button {
    width: 294px;
    height: 54px;
    border-radius: 64px;
    background: ${COLORS.BLUE};
    border: none;
    color: white;
    font-size: 22px;
    text-transform: capitalize;
    cursor: pointer;
    outline: none;
  }
`;

export { Container, Logo, Info };
