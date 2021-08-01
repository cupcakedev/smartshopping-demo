import { bootstrap } from 'smartshopping-sdk';

const promocodes = ['SALE50', 'SAVE40', 'BONUS500', 'A80'];

const { install, process } = bootstrap();

chrome.runtime.onInstalled.addListener(install);
chrome.tabs.onUpdated.addListener((tabId) => {
  process(tabId, promocodes).catch(() => {});
});
chrome.tabs.onReplaced.addListener((addedTabId) => {
  process(addedTabId, promocodes).catch(() => {});
});
