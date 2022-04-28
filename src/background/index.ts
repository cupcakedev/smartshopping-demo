import { bootstrap } from 'smartshopping-sdk';
import { requirePromocodes, requireShops } from '../utils';

const { install, startEngine } = bootstrap({
  clientID: 'demo',
  key: 'very secret key',
});

chrome.runtime.onInstalled.addListener(() => {
  install();
  requireShops();
});
chrome.storage.onChanged.addListener((changes) => {
  if ('env_isDevConfigs' in changes) requireShops();
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
