import { bootstrap } from 'smartshopping-sdk';
import { getApiUrl, requireShops } from '@utils/sdkUtils';
import { LocalStorageKeys } from 'src/storage/config';
import { executeScript } from '@utils/tabUtils';

(async () => {
    const serverUrl = await getApiUrl();
    const { install, startEngine } = bootstrap({
        clientID: 'demo',
        key: 'very secret key',
        serverUrl,
    });

    requireShops();
    install();

    chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
        if (changeInfo.status === 'complete') {
            startEngine(tabId);
        }
    });

    chrome.tabs.onReplaced.addListener(async (tabId) => {
        startEngine(tabId);
    });

    const storageChangeHandler = (changes: {
        [key: string]: chrome.storage.StorageChange;
    }) => {
        if (LocalStorageKeys.isDevMod in changes) chrome.runtime.reload();
    };
    chrome.storage.onChanged.addListener(storageChangeHandler);

    const scripts = chrome.runtime.getManifest().content_scripts || [];
    for (const cs of scripts) {
        for (const tab of await chrome.tabs.query({ url: cs.matches })) {
            if (tab.id && cs.js) {
                await executeScript(tab.id, cs.js);
                startEngine(tab.id);
            }
        }
    }
})();
