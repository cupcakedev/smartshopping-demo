import styled, { keyframes } from 'styled-components';
import { COLORS } from 'src/constants/constants';

const fadeIn = keyframes`
from {
    opacity: 0;
}
to {
    opacity: 1;
}
`;

export const Grid = styled.div`
    display: grid;
    width: 660px;
    height: 300px;
    margin: 0 0 0 40px;
    grid-template-columns: 580px 80px;
    grid-template-rows: 60px 80px 100px 80px;
    grid-template-areas:
        'title .'
        'bar count'
        'code .'
        'i .';
    place-items: center;
`;

const wiggle = keyframes`
from {
    background-position: 0 0;
}
to {
    background-position: 50px 50px;
}
`;

export const ProgressBar = styled.progress`
    grid-area: bar;
    appearance: none;
    width: 560px;
    height: 40px;
    &::-webkit-progress-bar {
        background-color: ${COLORS.extraLightGrey};
        border-radius: 6px;
    }
    &::-webkit-progress-value {
        height: 40px;
        border-radius: 6px;
        background-image: -webkit-linear-gradient(
            left,
            ${COLORS.primary},
            ${COLORS.primary}
        );
        transition: width 0.4s;
        animation: ${wiggle} 2s linear infinite;
    }
`;

export const Text = styled.p`
  grid-area: code;
  justify-self: flex-start;
  color: ${COLORS.grey};
  font-size: 24px;
  font-weight: bold
  line-height: 1;
`;

export const CodeCell = styled.div`
    display: inline-block;
    font-size: 24px;
    border-radius: 6px;
    padding: 8px 12px;
    margin-left: 8px;
    color: ${COLORS.grey};
    background-color: ${COLORS.extraLightGrey};
`;

export const CouponIcon = styled.img`
    width: 25px;
    margin: 0 6px -4px 0;
    filter: invert(100%) invert(60%) sepia(3%) saturate(493%) hue-rotate(194deg)
        brightness(94%) contrast(92%);
`;
