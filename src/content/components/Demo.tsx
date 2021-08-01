import React, { useState, useEffect } from 'react';

import { StartSlider } from './StartSlider';
import { StartDialog } from './StartDialog';
import { NoDealsDialog } from './NoDealsDialog';
import { TestingDialog } from './TestingDialog';
import { ResultDialog } from './ResultDialog';

import logo from '../assets/smartshoppingLogo.png';

import {
  GlobalStyle,
  ModalRoot,
  SliderRoot,
  Container,
  SmartShoppingLogo,
} from './styled_components';

import {
  Engine,
  EngineCheckoutState,
  EngineFinalCost,
  EngineConfig,
  EngineProgress,
} from 'smartshopping-sdk';

export const Demo = ({ engine }: { engine: Engine }) => {
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

  const [modalRootVisibility, setModalRootVisibility] =
    useState<boolean>(false);

  const closeSlider = () => setStage('INACTIVE');
  const closeModal = async () => {
    setModalRootVisibility(false);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStage('INACTIVE');
  };
  const activateFlow = async () => {
    setStage('READY');
    await new Promise((resolve) => setTimeout(resolve));
    setModalRootVisibility(true);
  };
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

  return (
    <>
      {stage === 'AWAIT' && (
        <SliderRoot>
          <GlobalStyle />
          <StartSlider
            start={activateFlow}
            close={closeSlider}
            promocodes={promocodes.length}
            shop={shop}
            total={checkoutState.total as number}
          />
        </SliderRoot>
      )}
      {['READY', 'APPLY', 'SUCCESS', 'FAIL'].includes(stage) && (
        <ModalRoot visible={modalRootVisibility}>
          <GlobalStyle />
          <Container stage={stage}>
            <SmartShoppingLogo src={logo} />
            {stage === 'READY' && (
              <StartDialog
                start={start}
                close={closeModal}
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
                close={closeModal}
                initialPrice={checkoutState.total as number}
                priceWithDeal={finalCost[bestCode]}
                bestCode={bestCode}
              />
            )}
            {stage === 'FAIL' && <NoDealsDialog close={closeModal} />}
          </Container>
        </ModalRoot>
      )}
    </>
  );
};
