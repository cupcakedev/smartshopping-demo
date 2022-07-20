import { bootstrap } from 'smartshopping-sdk';
import { getApiUrl, requirePromocodes, requireShops } from '../utils';

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
      const codes = await requirePromocodes(tabId);
      startEngine(tabId, codes);
    }
  });
  chrome.tabs.onReplaced.addListener(async (tabId) => {
    const codes = await requirePromocodes(tabId);
    startEngine(tabId, codes);
  });

  const storageChangeHandler = (changes: {
    [key: string]: chrome.storage.StorageChange;
  }) => {
    if ('env_isDevMod' in changes) chrome.runtime.reload();
  };
  
  chrome.storage.onChanged.addListener(storageChangeHandler);
})();
