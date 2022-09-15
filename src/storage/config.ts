import { createStorage } from 'webext-template-core';
import { IShops } from 'src/types';

/* When editing this file, follow the STORAGE_VERSION instructions: */

/**
 * Storage version must be set equal to extension version when in this version:
 *
 * 1. Storage key got deleted/renamed
 * 2. Any storage data type had changed (like if TypeScript type would change)
 *
 */
export const STORAGE_VERSION = '1.0.0';

export enum LocalStorageKeys {
    demoShops = 'demoShops',
    isDevMod = 'env_isDevMod',
}

export enum SyncStorageKeys {
    isDevMod = 'env_isDevMod',
}

export interface ILocalStorage {
    [LocalStorageKeys.demoShops]?: IShops[];
    [LocalStorageKeys.isDevMod]?: boolean;
}

export interface ISyncStorage {
    [SyncStorageKeys.isDevMod]?: boolean;
}

export type Storage = ILocalStorage & ISyncStorage;
export type StorageKey = LocalStorageKeys | SyncStorageKeys;

export const storage = createStorage<ILocalStorage, ISyncStorage>(
    LocalStorageKeys,
    SyncStorageKeys
);
