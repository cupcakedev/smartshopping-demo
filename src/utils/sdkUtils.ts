import { LocalStorageKeys, storage } from 'src/storage/config';
import { tabsGet } from 'src/utils/tabUtils';
import { API_URL } from '../constants/constants';

export async function getApiUrl() {
    const storageData = await storage.any.get([LocalStorageKeys.isDevMod]);
    const apiUrl = storageData?.env_isDevMod ? API_URL.dev : API_URL.prod;
    return apiUrl;
}

export async function requireShops() {
    const apiUrl = await getApiUrl();
    const response = await fetch(`${apiUrl}/demo/shops`);
    const shops = await response.json();
    await storage.any.set({ demoShops: shops });
}

export async function requirePromocodes(id: number): Promise<Array<string>> {
    const activeTab = await tabsGet(id);
    if (!activeTab) return [];
    const url = activeTab.pendingUrl || activeTab.url || '';

    const demoShops = await storage.any.get(LocalStorageKeys.demoShops);
    if (!demoShops) return [];
    const apiUrl = await getApiUrl();

    const locatedShop = demoShops.find(
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
