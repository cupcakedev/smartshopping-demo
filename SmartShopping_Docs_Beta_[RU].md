## SmartShopping SDK

### Установка

`npm i smartshopping-sdk`
`yarn add smartshopping-sdk`

### Интеграция

#### Background script

Рассмотрим пример бэкграунд-скрипта расширения, использующего **SmartShopping SDK**:

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

Функция `bootstrap` принимает два аргумента – ID клиента и секретный ключ, используемый для дешифрования приходящих с нашего сервера данных. Для того, чтобы узнать ваш ID и секретный ключ, обратитесь в техподдержку **SmartShopping**.

Она возвращает две функции:

- `install: () => Promise<void>` отвечает за загрузку хранимых локально данных о поддерживаемых мерчантах и настройку обмена сообщениями между бэкграунд и контентной частями **SmartShopping**.

- `process: (tabId: number, codes: Array<string>) => Promise<void>` отвечает за идентификацию мерчанта в активной вкладке, загрузку соответствующей конфигурации и инициализацию `Engine` в контентной части расширения.  
  Принимает два параметра: ID вкладки браузера и массив промокодов, подлежащих проверке.

В данном примере `requirePromocodes` – функция, определенная на стороне расширения-носителя. Она осуществляет поиск по базе мерчантов и возвращает массив промокодов для передачи в функцию `process`.

#### Content Script

В контентной части расширения нужно импортировать и инициализировать экземпляр класса `Engine`:

```
import { Engine } from 'smartshopping-sdk';

const engine = new Engine();
```

`engine` получает с бэкграунда объект конфигурации и реализует функционал автоприменения промокодов.
Это происходит в три этапа:

1. `engine.inspect()` – анализ страницы и сбор необходимой информации;

2. `engine.apply()` – последовательное применение промокодов и запись промежуточных результатов во внутренний контекст выполнения;

3. `engine.applyBest()` – поиск и применение наиболее выгодного промокода;

Все три этапа можно выполнить последовательно с помощью `engine.fullCycle()`.

Объект конфигурации выглядит следующим образом:

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

- `shopId` – уникальный идентификатор мерчанта в базе **SmartShopping**

- `shopName` – название мерчанта

- `shopUrl` – регулярное выражение, соответствующее всем URL, относящимся к этому мерчанту

- `checkoutUrl` – регулярное выражение, соответствующее URL страницы чекаута

- `inspect`, `apply` и `applyBest` – массивы команд для выполнения описанных выше этапов работы `engine`.

`engine` хранит данные в следующих свойствах:

1. `config: EngineConfig`
   Объек конфигурации
2. `progress: EngineProgress`
   Статус выполнения

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
   Информация, собранная на странице чекаута до применения купонов
   `checkoutState.total` – общая стоимость товаров в корзине до применения купонов

```
type EngineCheckoutState {
  total: null | number;
}
```

4. `finalCost: EngineFinalCost`
   Объект, хранящий пары вида `"промокод": "общая стоимость корзины после применения промокода"`

```
type EngineFinalCost = { [key: string]: number }
```

5. `promocodes: Array<string>`
   Массив промокодов, подлежащих проверке
6. `currentCode: string`
   Обрабатываемый в данный момент промокод
7. `bestCode: string`
   Наиболее выгодный промокод из списка
   Если ни один промокод не сработал, `bestCode === ''`
8. `checkout: boolean`
   Индикатор нахождения на странице чекаута

На изменение этих данных можно подписаться с помощью метода `engine.subscribe()`...

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

...и отписаться с помощью `engine.ubsubscribe()`, передав в качестве аргумента возвращаемый `engine.subscribe()` объект `unbinders`:

```
engine.unsubscribe(unbinders);
```

Не обязательно подписываться на все свойства – можно указать только интересующие вас.
Например, так:

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

`listener`-функции выглядят следующим образом:

```
listener: (value: %тип_свойства%, state: EngineState) => void;

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
