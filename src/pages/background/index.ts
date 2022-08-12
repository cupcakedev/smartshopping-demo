import { bootstrap } from 'smartshopping-sdk';
import { getApiUrl, requirePromocodes, requireShops } from '../../utils/utils';
import {LocalStorageKeys} from "../../storage/config";

(async () => {
  const serverUrl = await getApiUrl();
  const { install, startEngine } = bootstrap({
    clientID: 'demo',
    key: 'very secret key',
    serverUrl,
  });

  requireShops();
  install();

  /* Triggered an error when closing a tab:
   *
   * Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true,
   * but the message channel closed before a response was received
   *
   * Probably it is internal SDK error in startEngine()
   * */

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
    if (LocalStorageKeys.isDevMod in changes) chrome.runtime.reload();
  };

  chrome.storage.onChanged.addListener(storageChangeHandler);
})();
