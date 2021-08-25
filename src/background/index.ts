import { bootstrap } from 'smartshopping-sdk';
import { requirePromocodes, requireShops } from '../utils';

const clientID: string = 'demo';
const key: string = 'very secret key';

const { install, startEngine } = bootstrap({ clientID, key });

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
