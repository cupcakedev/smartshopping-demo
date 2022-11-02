import styled, { css, keyframes } from 'styled-components';
import { COLORS } from '@constants/theme';

const slideIn = keyframes`
  from {
    transform: translateX(590px);
  }
  to {
    transform: translateX(0px);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(590px);
  }
`;

export const Grid = styled.div<{ slide: 'in' | 'out' }>`
    position: relative;
    color: ${COLORS.grey};
    border-radius: 17px;
    width: 408px;
    box-shadow: 0px 3px 25px 28px rgba(0, 0, 0, 0.03);
    padding: 50px;
    background-color: ${COLORS.white};

    align-items: center;
    animation: ${(props) =>
        props.slide === 'in'
            ? css`
                  ${slideIn} 0.5s linear forwards
              `
            : css`
                  ${slideOut} 0.5s linear forwards
              `};
`;

export const Plan = styled.h3`
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    color: ${COLORS.primary};
    margin-bottom: 32px;
`;

export const Text = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 21px;
    line-height: 32px;
    text-align: center;
    color: ${COLORS.black};
    max-width: 270px;
    margin: 0 auto;
    text-align: center;
`;

export const Image = styled.img`
    width: 100%;
    height: auto;
    margin: 60px auto 0px auto;
`;

export const Button = styled.button`
    cursor: pointer;
    margin-top: 60px;
    background: ${COLORS.primary};
    border-radius: 7px;
    padding: 12px;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    outline: none;
    border: none;
    width: 100%;
    color: #ffffff;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background: ${COLORS.primaryDark};
    }
`;
