export const getCurrentTab = () =>
    new Promise<chrome.tabs.Tab | undefined>((resolve) =>
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) =>
            resolve(tabs[0])
        )
    );

export const openTab = async (url: string) =>
    new Promise<void>((resolve, reject) => {
        chrome.tabs.create({ url }, () => {
            resolve();
        });
    });

export const tabsGet = (tabId: number): Promise<any> => {
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
