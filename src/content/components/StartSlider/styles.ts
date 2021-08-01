import styled, { keyframes, css } from 'styled-components';
import { COLORS } from '../constants';

const fadeIn = keyframes`
  from {
    bottom: -360px;
  }
  to {
    bottom: 0;
  }
`;

const fadeOut = keyframes`
  from {
    bottom: 0px;
  }
  to {
    bottom: -360px;
  }
`;

export const Grid = styled.div<{ fade: 'in' | 'out' }>`
  position: relative;
  width: 280px;
  height: 360px;
  border-radius: 100px 0 0 0;
  padding-top: 40px;
  padding-left: 40px;
  background-color: ${COLORS.dark};
  color: ${COLORS.extraLightGrey};
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 50px 50px 50px 1fr;
  align-items: center;
  animation: ${(props) =>
    props.fade === 'in'
      ? css`
          ${fadeIn} 0.5s linear forwards
        `
      : css`
          ${fadeOut} 0.5s linear forwards
        `};
`;

export const Header = styled.p`
  text-align: center;
  font-size: 28px;
`;

export const Text = styled.p`
  margin: 5px 0;
  font-size: 20px;
`;

export const Start = styled.button`
  width: 200px;
  height: 40px;
  margin-left: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 17px;
  background-color: ${COLORS.secondary};
  color: ${COLORS.extraLightGrey};
  font-size: 30px;
  line-height: 30px;
  cursor: pointer;
  align-self: center;
  transition: background-color 0.1s;
  &:hover {
    background-color: ${COLORS.primary};
  }
`;

export const Close = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  height: 40px;
  width: 40px;
  padding-left: 10px;
  padding-bottom: 6px;
  border-radius: 0 0 0 25px;
  border-top: none;
  border-right: none;
  border-bottom: 2px solid ${COLORS.grey};
  border-left: 2px solid ${COLORS.grey};
  background-color: transparent;
  color: ${COLORS.grey};
  line-height: 25px;
  font-size: 25px;
  font-weight: 100;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  &:hover {
    color: ${COLORS.extraLightGrey};
    border-color: ${COLORS.extraLightGrey};
  }
`;
