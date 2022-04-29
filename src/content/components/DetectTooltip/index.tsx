import React from 'react';

import { TDetectStage } from '../Demo';
import { Text,  Container, ProgressIcon } from './styles';

interface IProps {
  userCode: string;
  detectStage: TDetectStage;
}

const DetectTooltip = ({ userCode, detectStage }: IProps) => (
  <Container stage={detectStage} data-test-role="detect-tooltip">
    <Text stage={detectStage}>
      {detectStage === 'COUPON-EXTRACTED' && `Coupon extracted - ${userCode}`}
      {detectStage === 'FAILED' && `Detect failed` }
    </Text>
  </Container>
);

export { DetectTooltip };
