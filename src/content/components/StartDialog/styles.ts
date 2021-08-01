import styled from 'styled-components';
import { COLORS } from 'src/content/components/constants';

export const Grid = styled.div`
  width: 700px;
  height: 300px;
  display: grid;
  align-items: end;
  grid-template-columns: 280px 420px;
  grid-template-rows: 60px 80px 1fr 80px 28px;
  grid-template-areas:
    'i .'
    'i t1'
    'i t2'
    'i b'
    'i t3';
`;

export const Image = styled.img`
  grid-area: i;
  width: 200px;
  justify-self: center;
  filter: invert(100%) invert(40%) sepia(89%) saturate(3163%) hue-rotate(230deg)
    brightness(94%) contrast(99%);
`;

export const Text = styled.p`
  font-size: 28px;
  color: ${COLORS.grey};
`;
