import React from 'react';
import ReactDOM from 'react-dom/client';

import 'src/logger';
import { engine } from 'smartshopping-sdk';
import { Demo } from './components/Demo/Demo';
import { LocalStorageKeys, storage } from 'src/storage/config';

document.getElementById('smartshop-injection')?.remove();

const injection = document.createElement('div');
injection.id = 'smartshop-injection';
document.body.appendChild(injection);

async function injectEntryPoint() {
    const isDevMode = await storage.any.get(LocalStorageKeys.isDevMod);
    ReactDOM.createRoot(injection).render(
        <Demo engine={engine} isDevMode={!!isDevMode} />
    );
}

injectEntryPoint()
    .then()
    .catch((e) => console.log(e));
