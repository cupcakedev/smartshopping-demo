import React from 'react';
import ReactDOM from 'react-dom/client';

import 'src/logger';
import { Engine } from 'smartshopping-sdk';
import { Demo } from '@content/components/Demo';

const injection = document.createElement('div');
injection.classList.add('smartshop-injection');
document.body.appendChild(injection);

async function injectEntryPoint() {
    const engine = new Engine();
    ReactDOM.createRoot(injection).render(<Demo engine={engine} />);
}

injectEntryPoint()
    .then()
    .catch((e) => console.log(e));
