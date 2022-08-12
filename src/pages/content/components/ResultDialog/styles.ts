import styled from 'styled-components';
import { COLORS } from 'src/constants/constants';

export const Grid = styled.div`
  position: relative;
  width: 660px;
  height: 300px;
  padding: 8px 0 0 40px;
  display: grid;
  grid-template-columns: 330px 330px;
  grid-template-rows: 60px 45px 45px 45px 80px;
  grid-template-areas:
    'h i'
    't1 i'
    't2 i'
    't3 i'
    'b .';
  place-items: center;
`;

export const Header = styled.p`
  grid-area: h;
  font-size: 25px;
  justify-self: start;
  font-weight: bold;
  color: ${COLORS.primary};
`;

export const Text = styled.p`
  color: ${COLORS.grey};
  font-size: 22px;
  font-weight: 500;
  justify-self: start;
`;

export const Image = styled.img`
  grid-area: i;
  width: 200px;
  align-self: start;
  filter: invert(100%) invert(40%) sepia(89%) saturate(3163%) hue-rotate(230deg)
    brightness(94%) contrast(99%);
`;
