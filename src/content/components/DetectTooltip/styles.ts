import styled, { keyframes } from 'styled-components';
import { COLORS } from 'src/constants';

const fadeIn = keyframes`
from {
    opacity: 0;
}
to {
    opacity: 1;
}
`;

const wiggle = keyframes`
from {
    background-position: 0 0;
}
to {
    background-position: 50px 50px;
}
`;

export const Text = styled.p`
  justify-self: flex-start;
  color: ${COLORS.grey};
  font-size: 12px;
  font-weight: normal
  line-height: 1;
`;

export const Container = styled.div`
  padding: 10px;
  background-color: ${COLORS.white};
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);
  background: ${COLORS.white};
`;


export const ProgressIcon = styled.div`
  width: 25px;
  background-color: green;
  border-radius: 50%;
`;
