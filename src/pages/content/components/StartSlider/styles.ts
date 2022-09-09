import styled, { keyframes, css } from 'styled-components';
import { COLORS } from '@constants/theme';

const fadeIn = keyframes`
  from {
    transform: translateX(360px);
  }
  to {
    transform: translateX(0px);
  }
`;

const fadeOut = keyframes`
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(360px);
  }
`;

const blink = keyframes`
  from {
      opacity: 0;
  }
  to {
      opacity: 1;
  }
`;

export const Grid = styled.div<{ fade: 'in' | 'out' }>`
    position: relative;
    width: 340px;
    height: 420px;
    border-radius: 8px;
    box-shadow: 0px 0px 25px 0px rgba(34, 60, 80, 0.2);
    padding-top: 40px;
    background-color: ${COLORS.white};
    color: ${COLORS.grey};
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
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
    font-size: 24px;
    font-weight: 800;
    color: ${COLORS.dark};
`;

export const Text = styled.p`
    text-align: center;
    margin: 5px 0;
    font-size: 20px;
    font-weight: 500;
`;

export const Start = styled.button`
    width: 300px;
    height: 50px;
    margin: 0 20px 34px 20px;
    border: none;
    border-radius: 12px;
    background-color: ${COLORS.primary};
    color: ${COLORS.white};
    font-size: 14px;
    line-height: 14px;
    cursor: pointer;
    align-self: center;
    transition: background-color 0.1s;
    &:hover {
        background-color: ${COLORS.secondary};
    }
`;

export const Close = styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    height: 40px;
    width: 40px;
    border: 0;
    padding-left: 10px;
    padding-bottom: 6px;
    background-color: transparent;
    cursor: pointer;
`;

export const Image = styled.img`
    width: 36px;
    margin: 0 6px -6px 0;
`;

export const CloseIcon = styled.img`
    width: 15px;
    transition: 0.2s;
    &:hover {
        transform: scale(1.2);
    }
`;

export const DetectIcon = styled.div`
    width: 15px;
    height: 15px;
    background-color: green;
    border-radius: 50%;
    margin-left: 5px;
    animation: ${blink} 2s linear infinite;
    display: inline-block;
`;

export const ValidationImage = styled.img`
  width: 18px;
  margin: 0 4px -2px 4px;
`;
