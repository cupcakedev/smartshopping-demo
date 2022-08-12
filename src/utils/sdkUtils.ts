import { API_URL } from "../constants/constants";

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

export async function getApiUrl() {
  const storageData = await localstoreGet(['env_isDevMod']);
  const apiUrl = storageData?.env_isDevMod ? API_URL.dev : API_URL.prod;
  return apiUrl;
}

export async function requireShops() {
  const apiUrl = await getApiUrl();
  const response = await fetch(`${apiUrl}/demo/shops`);
  const shops = await response.json();
  await localstoreSet({ demoShops: shops });
}

export async function requirePromocodes(id: number): Promise<Array<string>> {
  const activeTab = await tabsGet(id);
  if (!activeTab) return [];
  const url = activeTab.pendingUrl || activeTab.url || '';

  const storageData = await localstoreGet(['demoShops']);
  if (!storageData.demoShops) return [];
  const apiUrl = await getApiUrl();

  const locatedShop = storageData.demoShops.find(
    (shop: { id: string; urlPattern: string }) => {
      const pattern = new RegExp(shop.urlPattern);
      return pattern.test(url);
    }
  );
  if (!locatedShop) return [];

  const response = await fetch(`${apiUrl}/demo/${locatedShop.id}`);
  const promocodes = await response.json();
  return promocodes;
}
