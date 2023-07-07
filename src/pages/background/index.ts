import { bootstrap } from 'smartshopping-sdk';
import { getApiUrl, requirePromocodes, requireShops } from '@utils/sdkUtils';
import { LocalStorageKeys } from 'src/storage/config';
import { executeScript } from '@utils/tabUtils';

(async () => {
    const serverUrl = await getApiUrl();
    const { install, startEngine, setCodes, checkAdblockAndCookie } = bootstrap(
        {
            clientID: 'demo',
            key: 'very secret key',
            serverUrl,
        }
    );

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

    chrome.runtime.onMessage.addListener(
        async (message, sender, sendResponse) => {
            const tabId = sender?.tab?.id;
            if (!tabId) {
                return;
            }

            if (message.type === 'ready_to_CAA') {
                const codes = await requirePromocodes(tabId);
                if (codes.length) {
                    setCodes(tabId, codes);
                    sendResponse({ type: 'has_CAA_codes' });
                } else {
                    sendResponse({ type: 'no_CAA_codes' });
                }
            }

            if (message.type === 'check_adblock_cookie') {
                const { isAdblockDisabled, isCookieEnabled } =
                    await checkAdblockAndCookie();
                sendResponse({ isAdblockDisabled, isCookieEnabled });
            }
        }
    );

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
