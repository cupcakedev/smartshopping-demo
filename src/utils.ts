const API_BASE_URL = 'https://api2.smartshopping.ai/demo';

const localstoreSet = (items: Object): Promise<any> => {
  const promise = new Promise<void>((resolve, reject) => {
    chrome.storage.local.set(items, () => {
      const err = chrome.runtime.lastError;
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
  return promise;
};

const localstoreGet = (keys: Array<string>): Promise<any> => {
  const promise = new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (items) => {
      const err = chrome.runtime.lastError;
      if (err) {
        reject(err);
      } else {
        resolve(items);
      }
    });
  });
  return promise;
};

const tabsGet = (tabId: number): Promise<any> => {
  const promise = new Promise((resolve, reject) => {
    chrome.tabs.get(tabId, (tab) => {
      const err = chrome.runtime.lastError;
      if (err) {
        reject(err);
      } else {
        resolve(tab);
      }
    });
  });
  return promise;
};

export async function requireShops() {
  const response = await fetch(`${API_BASE_URL}/shops`);
  const shops = await response.json();
  await localstoreSet({ demoShops: shops });
}

export async function requirePromocodes(id: number): Promise<Array<string>> {
  const activeTab = await tabsGet(id);
  if (!activeTab) return [];
  const url = activeTab.pendingUrl || activeTab.url || '';

  const storageData = await localstoreGet(['demoShops']);
  if (!storageData.demoShops) return [];

  const locatedShop = storageData.demoShops.find(
    (shop: { id: string; urlPattern: string }) => {
      const pattern = new RegExp(shop.urlPattern);
      return pattern.test(url);
    }
  );
  if (!locatedShop) return [];

  const response = await fetch(`${API_BASE_URL}/${locatedShop.id}`);
  const promocodes = await response.json();
  return promocodes;
}
