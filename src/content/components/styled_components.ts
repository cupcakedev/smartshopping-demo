import styled, { createGlobalStyle } from 'styled-components';
import root from 'react-shadow/styled-components';

import { COLORS } from '../../constants';

export const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  box-sizing: border-box;
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font-family: Helvetica;
    font-weight: 500;
	vertical-align: baseline;
}
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
button {
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
button:hover button:active {
  outline: none;
}
`;

export const SliderRoot = styled(root.div)`
  position: fixed;
  z-index: 50000;
  width: 340px;
  height: 420px;
  top: 24px;
  right: 24px;
  border-radius: 8px;
  
`;

export const ModalRoot = styled(root.div)<{ visible: boolean }>`
  position: fixed;
  z-index: 50000;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
  opacity: ${(props) => (props.visible ? '1' : '0')};
  transition: opacity 0.5s;
`;

export const TooltipRoot = styled(root.div)`
  position: fixed;
  z-index: 50000;
  top: 5px;
  right: 24px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transition: width 0.3s, height 0.3s;
`;

export const Container = styled.div<{ stage: string }>`
  position: relative;
  width: ${(props) =>
    ({
      READY: '700px',
      APPLY: '700px',
      SUCCESS: '700px',
      FAIL: '700px',
    }[props.stage])};
  height: ${(props) =>
    ({
      READY: '420px',
      APPLY: '420px',
      SUCCESS: '420px',
      FAIL: '420px',
    }[props.stage])};
  transition: width 0.3s, height 0.3s;
  box-shadow: 0 3px 33px 0 rgba(0, 0, 0, 0.53);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  background: ${COLORS.white};
  color: ${COLORS.dark};
`;

export const MainButton = styled.button`
  grid-area: b;
  width: 300px;
  height: 60px;
  border: none;
  border-radius: 12px;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 1px;
  cursor: pointer;
  align-self: flex-start;
  justify-self: flex-start;
  margin-top: 20px;
  transition: background-color 0.1s;
  &:hover {
    background-color: ${COLORS.secondary};
  }
`;

export const CloseButton = styled.img`
  position: absolute;
  top: 30px;
  right: 30px;
  height: 15px;
  width: 15px;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    transform: scale(1.2);
  }
`;

export const SmartShoppingLogo = styled.img`
  margin: 40px 0 0 40px;
  width: 300px;
  height: 45px;
`;
