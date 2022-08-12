import React from 'react';
import ReactDOM from 'react-dom';
import { Engine } from 'smartshopping-sdk';
import { Demo } from './components/Demo';

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
    console.log(e);
}
