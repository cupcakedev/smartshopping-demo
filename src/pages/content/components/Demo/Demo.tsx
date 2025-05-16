import React, { useState, useEffect, useRef } from 'react';
import { StartDialog } from '../StartDialog';
import { NoDealsDialog } from '../NoDealsDialog';
import { TestingDialog } from '../TestingDialog';
import { ResultDialog } from '../ResultDialog';

import logo from '@assets/images/smartshoppingLogo.png';

import {
    GlobalStyle,
    ModalRoot,
    SliderRoot,
    Container,
    SmartShoppingLogo,
} from './styles';

import {
    Engine,
    EngineCheckoutState,
    EngineFinalCost,
    EngineConfig,
    EngineProgress,
    EngineState,
    EngineDetectState,
    EngineProductState,
} from 'smartshopping-sdk';
import { DevStartSlider } from '@content/components/DevStartSlider';
import { ClientStartSlider } from '@content/components/ClientStartSlider';
import { ProductSlider } from '@content/components/ProductSlider';

export type TDetectStage = 'INACTIVE' | 'STARTED' | 'COUPON-EXTRACTED';
export type TCAAStage =
    | 'INACTIVE'
    | 'IDLE'
    | 'AWAIT'
    | 'READY'
    | 'APPLY'
    | 'PRODUCT'
    | 'SUCCESS'
    | 'FAIL';

export const Demo = ({
    engine,
    isDevMode,
}: {
    engine: Engine;
    isDevMode: boolean;
}) => {
    const [stage, setStage] = useState<TCAAStage>('INACTIVE');
    const [detectStage, setDetectStage] = useState<TDetectStage>('INACTIVE');

    const [shop, setShop] = useState('');
    const [checkoutState, setCheckoutState] = useState<EngineCheckoutState>({
        total: null,
    });
    const [productState, setProductState] = useState<EngineProductState>({
        title: null,
        discountPrice: null,
        fullPrice: null,
        sku: null,
        imageUrl: null,
    });
    const [finalCost, setFinalCost] = useState<EngineFinalCost>({});
    const [promocodes, setPromocodes] = useState<Array<string>>([]);
    const [currentCode, setCurrentCode] = useState('');
    const [bestCode, setBestCode] = useState('');
    const [userCode, setUserCode] = useState('');
    const [isUserCodeValid, setIsUserCodeValid] = useState(false);

    const [inspectOnly, setInspectOnly] = useState(false);
    const hasDetect = useRef(false);

    const [startSliderVisibility, setStartSliderVisibility] = useState(false);
    const [modalRootVisibility, setModalRootVisibility] = useState(false);

    const closeSlider = () => {
        setStage('INACTIVE');
        engine.notifyAboutCloseModal();
    };
    const closeModal = async () => {
        setModalRootVisibility(false);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setStage('INACTIVE');
    };
    const closeStartModal = async () => {
        await closeModal();
        engine.notifyAboutCloseModal();
    };
    const closeTestingModal = async () => {
        engine.abort();
        await closeModal();
    };
    const activateDevFlow = async () => {
        setStage('READY');
        await new Promise((resolve) => setTimeout(resolve));
        setModalRootVisibility(true);
    };

    const activateClientFlow = async () => {
        await new Promise((resolve) => setTimeout(resolve));
        setModalRootVisibility(true);
        start();
    };

    const start = async () => {
        await engine.apply();
        await engine.applyBest();
    };

    // engine event listeners
    const configListener = (value: EngineConfig) => {
        setShop(value.shopName);
        setInspectOnly(value.apply.length === 0);
    };
    const checkoutStateListener = (value: EngineCheckoutState) => {
        setCheckoutState(value);
    };
    const productStateListener = (value: EngineProductState) => {
        setProductState(value);
    };
    const finalCostListener = (value: EngineFinalCost) => {
        setFinalCost(value);
    };
    const promocodesListener = (value: Array<string>) => {
        setPromocodes(value);
        setStartSliderVisibility(!!value.length);
    };
    const currentCodeListener = (value: string) => {
        setCurrentCode(value);
    };
    const bestCodeListener = (value: string) => {
        setBestCode(value);
    };
    const detectStateListener = (value: EngineDetectState) => {
        if (value.userCode) {
            setUserCode(value.userCode);
            setIsUserCodeValid(value.isValid);
            setDetectStage('COUPON-EXTRACTED');
            if (!isDevMode) {
                setStage('AWAIT');
                setStartSliderVisibility(true);
                engine.notifyAboutShowModal();
            }
        }
    };

    const checkoutListener = async (value: boolean, state: EngineState) => {
        if (stage === 'INACTIVE') setStage(value ? 'IDLE' : 'INACTIVE');
        if (state.checkoutState.total) {
            setModalRootVisibility(true);
        } else if (value) {
            console.log('if (value) ');
            if (document.readyState === 'complete') {
                console.log('complete');
                engine.inspect();
            } else {
                console.log('SET INSPECTOR');
                const inspector = () => {
                    console.log('inspector');
                    console.log('INSPECT');
                    engine.inspect();
                    document.removeEventListener('load', inspector);
                };
                document.addEventListener('load', inspector);
            }

            hasDetect.current = !!state?.config?.detect.length;
        }
    };

    const productListener = async (
        value: boolean | null,
        state: EngineState
    ) => {
        console.log('productListener', value, state);
        if (!value) return;
        if (stage === 'INACTIVE') {
            setStage(value ? 'PRODUCT' : 'INACTIVE');
        }
        if (document.readyState === 'complete') {
            engine.productInspect();
        } else {
            const inspector = () => {
                engine.productInspect();
                document.removeEventListener('load', inspector);
            };
            document.addEventListener('load', inspector);
        }
    };

    const handlResultFromBackground = (message: {
        type: 'has_CAA_codes' | 'no_CAA_codes';
    }) => {
        if (message.type === 'has_CAA_codes') {
            setStartSliderVisibility(true);
            engine.notifyAboutShowModal();
        }

        if (message.type === 'no_CAA_codes') {
            setStartSliderVisibility(true);
            if (!hasDetect.current) {
                return;
            }

            if (document.readyState === 'complete') {
                engine.detect();
            } else {
                const detector = () => {
                    document.removeEventListener('load', detector);
                    engine.detect();
                };
                document.addEventListener('load', detector);
            }
        }
    };

    const progressListener = (value: EngineProgress, state: EngineState) => {
        switch (value) {
            case 'INSPECT_END':
                if (state.checkoutState.total) {
                    setStage('AWAIT');
                } else {
                    setStage('INACTIVE');
                }
                break;
            case 'APPLY':
            case 'APPLY_END':
            case 'APPLY-BEST':
                setStage('APPLY');
                break;
            case 'APPLY-BEST_END':
                setStage(state.bestCode === '' ? 'FAIL' : 'SUCCESS');
                break;
            case 'DETECT':
                setDetectStage('STARTED');
                break;
            case 'DETECT_END':
                setDetectStage('COUPON-EXTRACTED');
                setStage('AWAIT');
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
            detectState: detectStateListener,
            checkout: checkoutListener,
            productState: productStateListener,
            product: productListener,
        });
        return () => {
            engine.unsubscribe(unbinders);
        };
    }, []);

    return (
        <>
            {stage === 'PRODUCT' && productState.title && (
                <SliderRoot data-test-role="product-slider">
                    <GlobalStyle />
                    <ProductSlider
                        fullPrice={productState.fullPrice}
                        title={productState.title}
                        close={closeSlider}
                        discountPrice={productState.discountPrice}
                        sku={productState.sku}
                        imageUrl={productState.imageUrl}
                    />
                </SliderRoot>
            )}
            {stage === 'AWAIT' && startSliderVisibility && (
                <SliderRoot data-test-role="start-slider">
                    <GlobalStyle />
                    {isDevMode ? (
                        <DevStartSlider
                            inspectOnly={inspectOnly || promocodes.length === 0}
                            start={activateDevFlow}
                            close={closeSlider}
                            promocodes={promocodes.length}
                            shop={shop}
                            total={checkoutState.total || 0}
                            userCode={userCode}
                            isUserCodeValid={isUserCodeValid}
                            detectStage={detectStage}
                        />
                    ) : (
                        <ClientStartSlider
                            inspectOnly={inspectOnly || promocodes.length === 0}
                            start={activateClientFlow}
                            close={closeSlider}
                            promocodes={promocodes.length}
                            total={checkoutState.total || 0}
                            userCode={userCode}
                            detectStage={detectStage}
                        />
                    )}
                </SliderRoot>
            )}
            {['READY', 'APPLY', 'SUCCESS', 'FAIL'].includes(stage) && (
                <ModalRoot
                    data-test-role="modal-root"
                    visible={modalRootVisibility}
                >
                    <GlobalStyle />
                    <Container stage={stage}>
                        <SmartShoppingLogo src={logo} />
                        {stage === 'READY' && (
                            <StartDialog
                                start={start}
                                close={closeStartModal}
                                totalAmount={promocodes.length}
                            />
                        )}
                        {stage === 'APPLY' && (
                            <TestingDialog
                                code={currentCode}
                                current={promocodes.indexOf(currentCode) + 1}
                                totalAmount={promocodes.length}
                                close={closeTestingModal}
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
                        {stage === 'FAIL' && (
                            <NoDealsDialog close={closeModal} />
                        )}
                    </Container>
                </ModalRoot>
            )}
        </>
    );
};
