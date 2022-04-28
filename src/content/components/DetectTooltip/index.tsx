import React from 'react';

import { COLORS } from 'src/constants';
import { TDetectStage } from '../Demo';
import { Text,  Container, ProgressIcon } from './styles';

interface IProps {
  userCode: string;
  detectStage: TDetectStage;
}

const DetectTooltip = ({ userCode, detectStage }: IProps) => (
  <Container stage={detectStage} data-test-role="detect-tooltip">
    <Text stage={detectStage}>
      {detectStage === 'INACTIVE' && 'Detect inactive'}
      {detectStage === 'STARTED' && 'Detect started'}
      {detectStage === 'COUPON-EXTRACTED' && `Coupon extracted - ${userCode}`}
      {detectStage === 'FAILED' && `Detect failed` }
    </Text>
    {detectStage === 'STARTED' && <ProgressIcon />}
  </Container>
);

export { DetectTooltip };
