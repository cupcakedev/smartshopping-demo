import React from 'react';
import ReactDOM from 'react-dom/client';

import 'src/logger';
import { Engine } from 'smartshopping-sdk';
import { Demo } from './components/Demo/Demo';
import { LocalStorageKeys, storage } from 'src/storage/config';

document.getElementById('smartshop-injection')?.remove();

const injection = document.createElement('div');
injection.id = 'smartshop-injection';
document.body.appendChild(injection);

async function injectEntryPoint() {
    const engine = new Engine();
    const isDevMode = await storage.any.get(LocalStorageKeys.isDevMod);
    const checkOnCookieAndAdblock = await storage.any.get(
        LocalStorageKeys.checkOnCookieAndAdblock
    );

    ReactDOM.createRoot(injection).render(
        <Demo
            engine={engine}
            isDevMode={!!isDevMode}
            checkOnCookieAndAdblock={!!checkOnCookieAndAdblock}
        />
    );
}

injectEntryPoint()
    .then()
    .catch((e) => console.log(e));
