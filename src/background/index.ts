import { bootstrap } from 'smartshopping-sdk';
import { getApiUrl, requirePromocodes, requireShops } from '../utils';


const start = async () => {
  const serverUrl = await getApiUrl();
  const { install, startEngine } = bootstrap({
    clientID: 'demo',
    key: 'very secret key',
    serverUrl,
  });
  
  chrome.runtime.onInstalled.addListener(() => {
    install();
    requireShops();
  });
  
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
}

start();

