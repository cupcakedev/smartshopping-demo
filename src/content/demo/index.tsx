import React, { useState, useEffect } from 'react';

import { StartSlider } from './components/StartSlider';
import { StartDialog } from './components/StartDialog';
import { NoDealsDialog } from './components/NoDealsDialog';
import { TestingDialog } from './components/TestingDialog';
import { ResultDialog } from './components/ResultDialog';

import { GlobalStyle, MockupRoot, SliderRoot } from './styled_components';

import {
  Engine,
  EngineCheckoutState,
  EngineFinalCost,
  EngineConfig,
  EngineProgress,
} from '@smartshopping/sdk';

export const Demo = ({
  engine,
  hidden,
}: {
  engine: Engine;
  hidden?: boolean;
}) => {
  const [stage, setStage] = useState<
    'INACTIVE' | 'IDLE' | 'AWAIT' | 'READY' | 'APPLY' | 'SUCCESS' | 'FAIL'
  >('INACTIVE');

  const [shop, setShop] = useState<string>('');
  const [checkoutState, setCheckoutState] = useState<EngineCheckoutState>({
    total: null,
  });
  const [finalCost, setFinalCost] = useState<EngineFinalCost>({});
  const [promocodes, setPromocodes] = useState<Array<string>>([]);
  const [currentCode, setCurrentCode] = useState<string>('');
  const [bestCode, setBestCode] = useState<string>('');

  const closePopup = () => setStage('INACTIVE');
  const activateFlow = () => setStage('READY');
  const start = async () => {
    await engine.apply();
    await engine.applyBest();
  };

  // engine event listeners
  const configListener = (state: EngineConfig) => {
    setShop(state.shopId);
  };
  const checkoutStateListener = (state: EngineCheckoutState) => {
    setCheckoutState(state);
  };
  const finalCostListener = (state: EngineFinalCost) => {
    setFinalCost(state);
  };
  const promocodesListener = (state: Array<string>) => {
    setPromocodes(state);
  };
  const currentCodeListener = (state: string) => {
    setCurrentCode(state);
  };
  const bestCodeListener = (state: string) => {
    setBestCode(state);
  };

  const checkoutListener = (state: boolean) => {
    setStage(state ? 'IDLE' : 'INACTIVE');
  };

  const progressListener = (state: EngineProgress) => {
    switch (state) {
      case 'INSPECT_END':
        setStage('AWAIT');
        break;
      case 'APPLY':
      case 'APPLY_END':
      case 'APPLY-BEST':
        setStage('APPLY');
        break;
      case 'APPLY-BEST_END':
        setStage(bestCode === '' ? 'FAIL' : 'SUCCESS');
        break;
      case 'CANCEL':
      case 'ERROR':
        setStage('INACTIVE');
        break;
      default:
        break;
    }
  };
  //

  useEffect(() => {
    const unbinders = engine.subscribe({
      config: configListener,
      checkoutState: checkoutStateListener,
      finalCost: finalCostListener,
      promocodes: promocodesListener,
      progress: progressListener,
      currentCode: currentCodeListener,
      bestCode: bestCodeListener,
      checkout: checkoutListener,
    });
    return () => {
      engine.unsubscribe(unbinders);
    };
  });

  useEffect(() => {
    if (stage === 'IDLE') {
      engine.inspect();
    }
  }, [stage, engine]);

  if (hidden) return null;
  return (
    <>
      <SliderRoot visible={stage === 'AWAIT'}>
        <GlobalStyle />
        <StartSlider
          start={activateFlow}
          close={closePopup}
          promocodes={promocodes}
          shop={shop}
          total={checkoutState.total as number}
        />
      </SliderRoot>
      <MockupRoot
        visible={['READY', 'APPLY', 'SUCCESS', 'FAIL'].includes(stage)}
      >
        <GlobalStyle />
        {stage === 'READY' && (
          <StartDialog
            start={start}
            close={closePopup}
            totalAmount={promocodes.length}
          />
        )}
        {stage === 'APPLY' && (
          <TestingDialog
            code={currentCode}
            current={promocodes.indexOf(currentCode) + 1}
            totalAmount={promocodes.length}
          />
        )}
        {stage === 'SUCCESS' && (
          <ResultDialog
            close={closePopup}
            initialPrice={checkoutState.total as number}
            priceWithDeal={finalCost[bestCode]}
          />
        )}
        {stage === 'FAIL' && <NoDealsDialog close={closePopup} />}
      </MockupRoot>
    </>
  );
};
