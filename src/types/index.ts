export interface IShops {
    id: string;
    urlPattern: string;
}

export enum CAACodesStatus {
    HasCAACodes = 'has_CAA_codes',
    NoCAACodes = 'no_CAA_codes',
}

export enum ContentToBackroundMessageType {
    ReadyToCAA = 'ready_to_CAA',
    CheckAdblockAndCookie = 'check_adblock_cookie',
}
