import styled from 'styled-components';
import { COLORS } from 'src/constants/constants';

export const Grid = styled.div`
  width: 660px;
  height: 300px;
  display: grid;
  align-items: end;
  margin: 0 0 0 40px;
  grid-template-columns: 400px 260px;
  grid-template-rows: 20px 80px 1fr 80px 28px;
  grid-template-areas:
    '. i'
    't1 i'
    't2 i'
    'b i'
    't3 i';
`;

export const Image = styled.img`
  grid-area: i;
  width: 200px;
  align-self: flex-start;
  justify-self: center;
  filter: invert(100%) invert(40%) sepia(89%) saturate(3163%) hue-rotate(230deg)
    brightness(94%) contrast(99%);
`;

export const Text = styled.p`
  font-size: 22px;
  color: ${COLORS.grey};
  line-height: 1.5;
  align-self: center;
`;
