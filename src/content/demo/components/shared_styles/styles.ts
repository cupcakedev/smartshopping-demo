import styled from 'styled-components';
import { MAIN_FONT_BOLD } from '../../constants';

const MainContainer = styled.div`
  height: 500px;
  width: 994px;
  transition: height 0.25s ease;

  &.result_stage {
    height: 606px;
  }

  & * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    max-width: unset;
    max-height: unset;
    min-height: unset;
    min-width: unset;
    letter-spacing: normal;
    font-family: ${MAIN_FONT_BOLD} !important;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  right: 22px;
  top: 22px;
  width: 32px;
  height: 32px;
  cursor: pointer;

  &:before,
  &:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: #919191;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

export { MainContainer, CloseButton };
