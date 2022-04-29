import { bootstrap } from 'smartshopping-sdk';
import { API_SERVER_URL } from 'src/constants';
import { getApiUrl, requirePromocodes, requireShops } from '../utils';

const serverUrl = API_SERVER_URL.prod;
const { install, startEngine } = bootstrap({
  clientID: 'demo',
  key: 'very secret key',
  serverUrl: serverUrl,
});

chrome.runtime.onInstalled.addListener(() => {
  install();
  requireShops();
});
chrome.storage.onChanged.addListener((changes) => {
  if ('env_isDevMod' in changes) requireShops();
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
