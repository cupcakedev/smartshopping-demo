import { createHookUseChromeStorage } from 'webext-template-core';

import {
    ILocalStorage,
    ISyncStorage,
    storage,
    SyncStorageKeys,
} from 'src/storage/config';

const useChromeStorage = createHookUseChromeStorage<
    ILocalStorage,
    ISyncStorage
>(storage, SyncStorageKeys);

export { useChromeStorage };
