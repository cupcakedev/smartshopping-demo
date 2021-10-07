## SmartShopping SDK

### Installation

`npm i smartshopping-sdk`
`yarn add smartshopping-sdk`

### Integration

#### Background script

Background script of extension using **SmartShopping SDK** might look like this:

```
import { bootstrap } from 'smartshopping-sdk';
import { requirePromocodes} from '../utils';

const { install, process } = bootstrap({clientID: 'demo', key: 'very secret key'});

chrome.runtime.onInstalled.addListener(() => {
  install();
});
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.status === 'complete') {
    const codes = await requirePromocodes(tabId);
    process(tabId, codes);
  }
});
chrome.tabs.onReplaced.addListener(async (tabId) => {
  const codes = await requirePromocodes(tabId);
  process(tabId, codes);
});
```

`bootstrap` takes two arguments – client ID and secret key, which is used for data decryption. If you dont know your ID and secret key, contact **SmartShopping** tech support.

It returns two functions:

- `install: () => Promise<void>` uploads and stores merchants data; also sets up message passing between background and content parts of **SmartShopping**.

- `process: (tabId: number, codes: Array<string>) => Promise<void>` identifies merchant in an active tab, uploads corresponding config and initializes `Engine` in a content script.  
  Takes two arguments: browser tab ID and array of promocodes for testing.

In the example above `requirePromocodes` is a function defined by host extension, responsible for finding promocodes which will be passed to `process`.

#### Content Script

In a content script you need to import and create an `Engine` instance:

```
import { Engine } from 'smartshopping-sdk';

const engine = new Engine();
```

`engine` receives config object from background script and manages coupon autoapply flow.
There are 3 stages:

1. `engine.inspect()` – analyzing checkout page and collecting information;

2. `engine.apply()` – applying promocodes and storing results into internal execution context;

3. `engine.applyBest()` – choosing and applying best promocode;

All three stages can be executed consistently via `engine.fullCycle()`.

Config object looks like this:

```
type EngineConfig {
  shopId: string;
  shopName: string;
  shopUrl: string;
  checkoutUrl: string;
  inspect: Array<Command>;
  apply: Array<Command>;
  applyBest: Array<Command>;
}
```

- `shopId` – merchant's unique ID in **SmartShopping** database

- `shopName` – merchant's name

- `shopUrl` – RegEx matching all merchant's URLs

- `checkoutUrl` – RegEx matching merchant's checkout page

- `inspect`, `apply` and `applyBest` – arrays of commands for respective stages of auto apply flow.

`engine` stores info in the following properties:

1. `config: EngineConfig`
   Config object
2. `progress: EngineProgress`
   Execution status

```
 type EngineProgress =
  | 'IDLE'
  | 'INSPECT'
  | 'INSPECT_END'
  | 'APPLY'
  | 'APPLY_END'
  | 'APPLY-BEST'
  | 'APPLY-BEST_END'
  | 'ERROR'
  | 'CANCEL';
```

3. `checkoutState: EngineCheckoutState`
   Info collected during `inspect` stage
   `checkoutState.total` – cart total before applying any codes

```
type EngineCheckoutState {
  total: null | number;
}
```

4. `finalCost: EngineFinalCost`
   This object contains pairs `"promocode": "cart total after applying promocode"`

```
type EngineFinalCost = { [key: string]: number }
```

5. `promocodes: Array<string>`
   Array of promocodes for testing
6. `currentCode: string`
   Promocode currently being processed
7. `bestCode: string`
   Most profitable promocode
   If none of the codes worked, `bestCode === ''`
8. `checkout: boolean`
   Flag for being on checkout page

You can subscribe to those properties' changes via `engine.subscribe()`...

```
const unbinders = engine.subscribe(
    {
      config: configListener,
      checkoutState: checkoutStateListener,
      finalCost: finalCostListener,
      promocodes: promocodesListener,
      progress: progressListener,
      currentCode: currentCodeListener,
      bestCode: bestCodeListener,
      checkout: checkoutListener,
    }
);
```

...and unsubscribe via `engine.ubsubscribe()`, passing return value of `engine.subscribe()` as an argument:

```
engine.unsubscribe(unbinders);
```

Subscribing for properties is optional so you may only choose ones you need and skip the rest:

```
const unbinders = engine.subscribe(
    {
      progress: listener1,
      currentCode: listener2,
      bestCode: listener3,
      checkout: listener4,
    }
);
```

`listener`-functions look like this:

```
listener: (value: %property_type%, state: EngineState) => void;

interface EngineState {
  checkoutState: EngineCheckoutState;
  finalCost: EngineFinalCost;
  progress: EngineProgress;
  config: EngineConfig;
  promocodes: Array<string>;
  bestCode: string;
  currentCode: string;
  checkout: boolean;
}
```
