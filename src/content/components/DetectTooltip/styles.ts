import styled, { keyframes } from 'styled-components';
import { COLORS } from 'src/constants';
import { TDetectStage } from '../Demo';

const blink = keyframes`
  from {
      opacity: 0;
  }
  to {
      opacity: 1;
  }
`;

export const Text = styled.p<{ stage: TDetectStage }>`
  justify-self: flex-start;
  font-size: 12px;
  font-weight: normal
  line-height: 1;
  color: ${(props) => (props.stage === 'STARTED' ? COLORS.grey : COLORS.white )}
`;

export const Container = styled.div<{ stage: TDetectStage }>`
  padding: 10px;
  background-color: ${COLORS.white};
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);
  background-color: ${(props) =>
    ({
      'COUPON-EXTRACTED': COLORS.green,
      FAILED: COLORS.red,
      STARTED: COLORS.white,
      INACTIVE: COLORS.white,
    }[props.stage])};
  display: flex;
`;


export const ProgressIcon = styled.div`
  width: 15px;
  height: 15px;
  background-color: green;
  border-radius: 50%;
  margin-left: 5px;
  animation: ${blink} 2s linear infinite;
`;
