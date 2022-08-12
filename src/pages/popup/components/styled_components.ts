import styled from 'styled-components';
import { COLORS } from 'src/constants/constants';

const Container = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

const Button = styled.button<{ enabled: boolean }>`
  width: 160px;
  height: 40px;
  border-radius: 10px;
  font-size: 20px;
  text-align: center;
  outline: none;
  border: 3px solid
    ${COLORS.primary};
  background-color: ${(props) =>
      props.enabled ? COLORS.primary : COLORS.white}};
  color: ${(props) => (props.enabled ? COLORS.white : COLORS.primary)};
  transition: background-color 0.2s;
  cursor: pointer;
`;

export { Container, Button };
