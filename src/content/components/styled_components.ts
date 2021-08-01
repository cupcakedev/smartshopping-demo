import styled, { createGlobalStyle } from 'styled-components';
import root from 'react-shadow/styled-components';

import { COLORS } from './constants';

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
  color: ${COLORS.dark};
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

export const SliderRoot = styled(root.div)<{ visible: boolean }>`
  position: fixed;
  z-index: 50000;
  width: 300px;
  height: 180px;
  top: 30px;
  right: 30px;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.visible ? '1' : '0')};
  transition: visibility 1s, opacity 1s;
`;

export const MockupRoot = styled(root.div)<{ visible: boolean }>`
  position: fixed;
  z-index: 50000;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  backdrop-filter: grayscale(100%) blur(10px);
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.visible ? '1' : '0')};
  transition: visibility 1s, opacity 1s;
`;

export const Container = styled.div<{ stage: string }>`
  position: relative;
  width: ${(props) =>
    ({
      READY: '700px',
      APPLY: '580px',
      SUCCESS: '700px',
      FAIL: '700px',
    }[props.stage])};
  height: ${(props) =>
    ({
      READY: '420px',
      APPLY: '300px',
      SUCCESS: '420px',
      FAIL: '420px',
    }[props.stage])};
  transition: width 0.3s, height 0.3s;
  box-shadow: 0 3px 33px 0 rgba(0, 0, 0, 0.53);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  background: ${COLORS.extraLightGrey};
  color: ${COLORS.dark};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  height: 30px;
  width: 30px;
  padding-left: 6px;
  padding-bottom: 3px;
  border-radius: 15px;
  border: 2px solid ${COLORS.lightGrey};
  color: ${COLORS.lightGrey};
  line-height: 20px;
  font-size: 20px;
  font-weight: 100;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  &:hover {
    color: ${COLORS.dark};
    border-color: ${COLORS.dark};
  }
`;

export const SmartShoppingLogo = styled.img`
  margin-top: 20px;
  width: 300px;
  height: 40px;
`;
