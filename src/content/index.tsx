import React from 'react';
import ReactDOM from 'react-dom';
import { Engine } from 'smartshopping-sdk';
import { Demo } from './demo';

try {
  const engine = new Engine();

  const injection = document.createElement('div');
  injection.classList.add('smartshop-injection');
  document.body.appendChild(injection);

  ReactDOM.render(
    <>
      <Demo engine={engine} />
    </>,
    injection
  );
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(e);
}
