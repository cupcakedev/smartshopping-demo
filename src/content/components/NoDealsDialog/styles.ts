import styled from 'styled-components';
import { COLORS } from 'src/content/components/constants';

export const Grid = styled.div`
  width: 580px;
  height: 240px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 30px 80px 50px 80px;
  grid-template-areas:
    '.'
    't1'
    'b'
    't2';
  place-items: center;
`;

export const Text = styled.p`
  color: ${COLORS.grey};
  font-size: 32px;
`;
