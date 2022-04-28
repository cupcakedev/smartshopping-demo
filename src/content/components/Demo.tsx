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
  TooltipRoot,
} from './styled_components';

import {
  Engine,
  EngineCheckoutState,
  EngineFinalCost,
  EngineConfig,
  EngineProgress,
  EngineState,
} from 'smartshopping-sdk';
import { DetectTooltip } from './DetectTooltip';

export type TDetectStage = 'INACTIVE' | 'STARTED' | 'COUPON-EXTRACTED' | 'FAILED';

export const Demo = ({ engine }: { engine: Engine }) => {
  const [stage, setStage] = useState<
    'INACTIVE' | 'IDLE' | 'AWAIT' | 'READY' | 'APPLY' | 'SUCCESS' | 'FAIL'
    >('INACTIVE');
  
  const [detectStage, setDetectStage] = useState<TDetectStage>('INACTIVE')

  const [shop, setShop] = useState<string>('');
  const [isDetectAvailable, setIsDetectAvailable] = useState<boolean>(false);
  const [isDevConfigs, setIsDevConfigs] = useState<boolean>(false);
  const [checkoutState, setCheckoutState] = useState<EngineCheckoutState>({
    total: null,
  });
  const [finalCost, setFinalCost] = useState<EngineFinalCost>({});
  const [promocodes, setPromocodes] = useState<Array<string>>([]);
  const [currentCode, setCurrentCode] = useState<string>('');
  const [bestCode, setBestCode] = useState<string>('');
  const [userCode, setUserCode] = useState<string>('');

  const [inspectOnly, setInspectOnly] = useState<boolean>(false);

  const [modalRootVisibility, setModalRootVisibility] =
    useState<boolean>(false);
  
  chrome.storage.local.get(
    ['env_isDevConfigs'],
    (items) => {
      setIsDevConfigs(items.env_isDevConfigs);
    }
  );

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
  const activateDetect = async () => {
    closeSlider();
    setDetectStage('STARTED')
    try {
      await engine.detect();
      setDetectStage('COUPON-EXTRACTED')
    } catch (e) {
      console.log('Detect failed, error - ', e);
      setDetectStage('FAILED');
    }

  }

  // engine event listeners
  const configListener = (value: EngineConfig) => {
    setShop(value.shopName);
    setInspectOnly(value.apply.length === 0);
    setIsDetectAvailable(value.detect.length > 0)
  };
  const checkoutStateListener = (value: EngineCheckoutState) => {
    setCheckoutState(value);
  };
  const finalCostListener = (value: EngineFinalCost) => {
    setFinalCost(value);
  };
  const promocodesListener = (value: Array<string>) => {
    setPromocodes(value);
  };
  const currentCodeListener = (value: string) => {
    setCurrentCode(value);
  };
  const bestCodeListener = (value: string) => {
    setBestCode(value);
  };
  const userCodeListener = (value: string) => {
    setUserCode(value);
  };

  const checkoutListener = (value: boolean, state: EngineState) => {
    if (stage === 'INACTIVE') setStage(value ? 'IDLE' : 'INACTIVE');
    if (state.checkoutState.total) {
      setModalRootVisibility(true);
    } else if (value) {
      if (document.readyState === 'complete') {
        engine.inspect();
      } else {
        const inspector = () => {
          engine.inspect();
          document.removeEventListener('load', inspector);
        };
        document.addEventListener('load', inspector);
      }
    }
  };

  const progressListener = (value: EngineProgress, state: EngineState) => {
    console.log('progressListener - ', value)
    switch (value) {
      case 'INSPECT_END':
        if (state.checkoutState.total) setStage('AWAIT');
        else setStage('INACTIVE');
        break;
      case 'APPLY':
      case 'APPLY_END':
      case 'APPLY-BEST':
        setStage('APPLY');
        break;
      case 'APPLY-BEST_END':
        setStage(state.bestCode === '' ? 'FAIL' : 'SUCCESS');
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
      userCode: userCodeListener,
      checkout: checkoutListener,
    });
    return () => {
      engine.unsubscribe(unbinders);
    };
  }, []);

  return (
    <>
      {stage === 'AWAIT' && (
        <SliderRoot data-test-role="start-slider">
          <GlobalStyle />
          <StartSlider
            inspectOnly={inspectOnly}
            start={activateFlow}
            close={closeSlider}
            promocodes={promocodes.length}
            shop={shop}
            total={checkoutState.total as number}
            activateDetect={activateDetect}
            isDetectButtonVisible={isDetectAvailable && isDevConfigs}
          />
        </SliderRoot>
      )}
      {detectStage !=='INACTIVE' && (
        <TooltipRoot data-test-role="detect-tooltip" visible={true}>
          <GlobalStyle />
          <DetectTooltip
            userCode={userCode}
            detectStage={detectStage}
          />
        </TooltipRoot>
      )}
      {['READY', 'APPLY', 'SUCCESS', 'FAIL'].includes(stage) && (
        <ModalRoot data-test-role="modal-root" visible={modalRootVisibility}>
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
