import styled from 'styled-components';
import { COLORS, MAIN_FONT_BOLD } from '../../constants';

const Container = styled.div`
  transform: scale(0.7, 0.7);
  height: 100%;
  width: 100%;
  max-width: 994px;
  max-height: 530px;
  box-shadow: 0 3px 33px 0 rgba(0, 0, 0, 0.53);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
  font-family: ${MAIN_FONT_BOLD};
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

  & img {
    width: 360px;
    height: 80px;
    z-index: 20;
  }
`;

const Info = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  & .btcr-exclamation-icon {
    height: 80px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
  }

  h1 {
    text-transform: uppercase;
    color: ${COLORS.ORANGE};
    font-size: 40px;
    font-weight: bold;
  }

  p {
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    color: ${COLORS.BLACK_GREY};
  }

  button {
    background: ${COLORS.TANGERINE};
    color: white;
    border: none;
    padding: 14px;
    font-size: 22px;
    font-weight: bold;
    text-transform: capitalize;
    width: 294px;
    border-radius: 27px;
    outline: none;
    cursor: pointer;
  }
`;

export { Container, Logo, Info };
