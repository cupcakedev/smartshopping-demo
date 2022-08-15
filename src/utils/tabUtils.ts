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
