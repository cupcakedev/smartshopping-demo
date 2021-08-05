import { bootstrap } from 'smartshopping-sdk';
import { requirePromocodes, requireShops } from '../utils';

const { install, process } = bootstrap();

chrome.runtime.onInstalled.addListener(() => {
  install();
  requireShops();
});
chrome.tabs.onUpdated.addListener(async (tabId) => {
  const codes = await requirePromocodes(tabId);
  process(tabId, codes).catch(() => {});
});
chrome.tabs.onReplaced.addListener(async (tabId) => {
  const codes = await requirePromocodes(tabId);
  process(tabId, codes).catch(() => {});
});
