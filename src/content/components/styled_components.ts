import styled, { createGlobalStyle } from 'styled-components';
import root from 'react-shadow/styled-components';

import Poppins from 'src/content/demo/assetsNew/fonts/poppins.woff2';
import { COLORS } from './constants';

export const GlobalStyle = createGlobalStyle` 
@font-face {
  font-family: 'Poppins';
  url(${Poppins}) format('woff2');
  font-weight: 300;
  font-style: normal;
}
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
  font-family: 'Poppins';
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
`;

export const SliderRoot = styled(root.div)<{ visible: boolean }>`
  position: fixed;
  z-index: 60000;
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

export const Container = styled.div`
  transform: scale(0.7, 0.7);
  height: 100%;
  width: 100%;
  max-height: 600px;
  max-width: 990px;
  box-shadow: 0 3px 33px 0 rgba(0, 0, 0, 0.53);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
`;
