import styled, { keyframes } from 'styled-components';
import { COLORS } from 'src/content/components/constants';

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
  width: 580px;
  height: 200px;
  padding-left: 4px;
  grid-template-columns: 88px 400px 88px;
  grid-template-rows: 80px 50px 50px 50px;
  grid-template-areas:
    '. title .'
    '. code .'
    'cog-l bar cog-r'
    '. count .';
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
  width: 400px;
  height: 40px;
  &::-webkit-progress-bar {
    background-color: ${COLORS.dark};
    border-radius: 20px;
    padding: 4px;
  }
  &::-webkit-progress-value {
    height: 32px;
    border-radius: 20px;
    background-image: -webkit-linear-gradient(left, ${COLORS.secondary}, ${COLORS.primary});
    transition: width 0.4s;
    animation: ${wiggle} 2s linear infinite;
  }
`;

export const Text = styled.p`
  color: ${COLORS.dark};
  font-size: 32px;
  line-height: 1;
`;

const rotate = keyframes`
from {
    transform: rotate(0deg);
}
to {
    transform: rotate(360deg);
}
`;

export const Cog = styled.img<{ side: 'left' | 'right' }>`
  width: 50px;
  height: 50px;
  margin: 0 20px;
  animation: ${rotate} linear 2s infinite;
  animation-direction: ${(props) =>
    props.side === 'left' ? 'normal' : 'reverse'};
  justify-self: ${(props) => (props.side === 'left' ? 'end' : 'start')};
`;
