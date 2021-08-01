import { bootstrap } from 'smartshopping-sdk';

const promocodes = [
  'KODI',
  'KODI1',
  'KODI2',
  'KODI3',
  'KODI4',
  'KODI5',
  'KODI6',
  'KODI7',
  'KODI8',
];

const { install, process } = bootstrap();

chrome.runtime.onInstalled.addListener(install);
chrome.tabs.onUpdated.addListener((tabId) => {
  process(tabId, promocodes).catch(() => {});
});
chrome.tabs.onReplaced.addListener((addedTabId) => {
  process(addedTabId, promocodes).catch(() => {});
});
