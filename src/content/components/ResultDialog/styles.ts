import styled from 'styled-components';
import { COLORS } from 'src/content/components/constants';

export const Grid = styled.div`
  position: relative;
  width: 700px;
  height: 360px;
  padding: 10px 20px;
  display: grid;
  grid-template-columns: 270px 390px;
  grid-template-rows: 1fr 80px 50px 50px 70px;
  grid-template-areas:
    'h i'
    't1 i'
    't2 i'
    't3 i'
    'b b';
  place-items: center;
`;

export const Header = styled.p`
  grid-area: h;
  font-size: 40px;
  justify-self: start;
`;

export const Text = styled.p`
  color: ${COLORS.grey};
  font-size: 28px;
  justify-self: start;
`;

export const Image = styled.img`
  grid-area: i;
  width: 390px;
  align-self: start;
`;
